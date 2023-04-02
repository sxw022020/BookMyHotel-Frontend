import React, { useState, useEffect, useRef } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import { AiOutlineUser } from "react-icons/ai";
import { login, registration } from "../utils";

/**
 * The interface, LoginPageProps, specifies the props that the Login Page component should expect. 
 * In this case, it has a single prop, onLoginSuccess, 
 * which is a function that takes two arguments: token (of type string) and asHost (of type boolean).
 */
interface LoginPageProps {
    /**
     * A function to deal with successful login.
     * 
     * @param token 
     * @param asHost 
     * @returns void
     */
    handleLoginSuccess: (token: string, asHost: boolean) => void;
}

/**
 * `React.FC` stands for "React Functional Component," 
 * and `<LoginPageProps>` specifies the type of the component's props. 
 */
const LoginPage: React.FC<LoginPageProps> = ({ handleLoginSuccess }) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [asHost, setAsHost] = useState(false);
    const [loading, setLoading] = useState(false);

    const onFinish = () => {
        console.log("finish form");
    }

    const handleLogin = async () => {
        if (!formRef.current) return;

        try {
            const formData = new FormData(formRef.current);
            setLoading(true);

            const response = await login(Object.fromEntries(formData), asHost);
            handleLoginSuccess(response.token, asHost);
        } catch (error) {
            console.error("A error occurred: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegistration = async () => {
        if (!formRef.current) return;

        try {
            const formData = new FormData(formRef.current);
            setLoading(true);

            const response = await registration(Object.fromEntries(formData), asHost);
            console.log("Registration Succeeded!");
        } catch (error) {
            console.error("A error occurred: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAsHost(e.target.checked);
    };

    return (
        <div style = {{ width: 500, margin: "20px auto"}}>

            <Form ref = {formRef} onSubmit = {onFinish}>
                <Form.Group controlId = "username">
                    <FormControl 
                        disabled = {loading}
                        type = "text"
                        placeholder = "Username"
                        required
                    />
                    <Form.Text className = "text-muted">
                        <AiOutlineUser size = {16} />
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId = "password">
                    <FormControl 
                        disabled = {loading}
                        type = "password"
                        placeholder = "Password"
                        required
                    />
                    {/* TODO: add a icon? */}
                    {/* <Form.Text className = "text-muted">
                        <AiOutlineUser size = {16} />
                    </Form.Text> */}
                </Form.Group>

                <Form.Check 
                    type = "switch"
                    id = "as-host"
                    label = "As Host"
                    disabled = {loading}
                    checked = {asHost}
                    onChange = {handleCheckboxOnChange}
                />
            </Form>
            
            <Button
                onClick = {handleLogin}
                disabled = {loading}
                variant = "primary"
                type = "button"
            >
                Log In
            </Button>
            <Button
                onClick = {handleRegistration}
                disabled = {loading}
                variant = "primary"
                type = "button"
            >
                Registration
            </Button>
        </div>
    );
};

export default LoginPage;