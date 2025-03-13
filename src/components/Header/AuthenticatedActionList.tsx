import { toast } from "react-toastify"
import { useAuthContext } from "../../app/hooks/useAuthContext"
import { IconAvatar } from "../Icons"
import { TransparentButton } from "../TransparentButton"
import { List, ListItem } from "./styles"
import { useNavigate } from "react-router"

export const AuthenticatedActionList = () => {

    // Busca o contexto de logout do authContext

    const { logout } = useAuthContext()
    const navigate = useNavigate();

    const onAskForLogout = async () => {
        try {
            console.log('logout')
            // Espera pela ação
            await logout()
            toast.success("Usuário deslogado com sucesso")
            // retorna para página de login
            navigate('/auth/login')
        } catch ( erro ) {
            console.log(erro);
            toast.error("Houve um erro ao deslogar")
        }
    }

    return (
            <List>
                <ListItem>
                    {}
                </ListItem>
                <ListItem>
                    <IconAvatar />
                </ListItem>
                <ListItem>
                    <TransparentButton onClick={onAskForLogout}>
                        Logout
                    </TransparentButton>
                </ListItem>
            </List>
    )
}