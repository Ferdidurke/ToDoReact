import {useDispatch, useSelector} from "react-redux";
import jwtDecode from "jwt-decode";
import {logout} from "../store/redux-toolkit/reducers/authReducer";

export function checkToken () {
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const decodedToken = jwtDecode(token);
    const currentDate = new Date();
    console.log(decodedToken)
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
        dispatch(logout())
    }
}