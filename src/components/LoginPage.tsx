import React, { useState, useEffect } from "react";
import { Form, Button, FormControl, Checkbox } from "react-bootstrap";
import { User } from "react-bootstrap-icons";
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
    onLoginSuccess: (token: string, asHost: boolean) => void;
}

