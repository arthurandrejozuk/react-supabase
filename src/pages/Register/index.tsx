import { useState } from "react";
import { Button } from "../../components/Button";
import { Fieldset } from "../../components/Fieldset";
import { FormLabel } from "../../components/FormLabel";
import { TextField } from "../../components/TextField";
import { Figure, Form, FormActions, Heading, Image } from "../../components/Form";
import { CreateUser } from "../../domain/useCases/CreateUser";
import { UserSupabaseRepository } from "../../infra/supabase/UserSupabaseRepository";
import { toast } from "react-toastify";

const createUser = new CreateUser(new UserSupabaseRepository())

export const Register = () => {
    const [user, setUser] = useState({ name: '', email: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const registerUser = async (evt: React.FormEvent<HTMLFormElement>) => {
        // registra usuario pelo componente FormRegister
        evt.preventDefault();
        try {
            await createUser.execute(user);
            toast.success('Usuário cadastrado com sucesso!')
            setUser({ name: '', email: '', password: '' });
        } catch (error) {
            console.log("Falha ao cadastrar", error)
            toast.error('Ops, falha ao cadastrar')
        }
    };

    return (
        <>
            <Figure>
                <Image src="/imgs/register.png" />
            </Figure>
            <div>
                <Heading>
                    Cadastro
                </Heading>
                <p>Preencha os campos abaixo para<br/>criar sua conta corrente!</p>
                <Form onSubmit={registerUser}>
                    <Fieldset>
                        <FormLabel>
                            Nome
                        </FormLabel>
                        <TextField
                            name="name"
                            placeholder="Digite seu nome completo"
                            value={user.name}
                            onChange={handleChange}
                            required
                        />
                    </Fieldset>
                    <Fieldset>
                        <FormLabel>
                            Email
                        </FormLabel>
                        <TextField
                            name="email"
                            type="email"
                            placeholder="Digite seu email"
                            value={user.email}
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
                            value={user.password}
                            onChange={handleChange}
                            required
                        />
                    </Fieldset>
                    <FormActions>
                        <Button type="submit">
                            Abrir conta
                        </Button>
                    </FormActions>
                </Form>
            </div>
        </>
    );
};
