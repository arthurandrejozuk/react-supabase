import { useState } from "react";

import { useAuthContext } from "../../app/hooks/useAuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Figure, Form, FormActions, Heading, Image } from "../../components/Form";
import { Fieldset } from "../../components/Fieldset";
import { FormLabel } from "../../components/FormLabel";
import { TextField } from "../../components/TextField";
import { Button } from "../../components/Button";


export const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    // Busca a função de login no context de auth
    const { login } = useAuthContext()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    const loginUser = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        try {
            // Espera a promise e insere as credenciais para login
            await login(credentials.email, credentials.password);
            toast.success("Boas vindas ao Anybank!")
            navigate('/')
        } catch (error) {
            console.log("Falha ao fazer login", error)
            toast.error("Falha ao logar")
        }
    };

    return (
        <>
            <Figure>
                <Image src="/imgs/login.png" />
            </Figure>
            <div>
                <Heading>
                    Login
                </Heading>
                <p>Preencha os dados do login.</p>
                <Form onSubmit={loginUser}>
                    <Fieldset>
                        <FormLabel>
                            Email
                        </FormLabel>
                        <TextField
                            name="email"
                            type="email"
                            placeholder="Digite seu email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                    </Fieldset>
                    <Fieldset>
                        <FormLabel>
                            Senha
                        </FormLabel>
                        <TextField
                            name="password"
                            type="password"
                            placeholder="Digite sua senha"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </Fieldset>
                    <FormActions>
                        <Button type="submit">
                            Efetuar login
                        </Button>
                    </FormActions>
                </Form>
            </div>
        </>
    );
};