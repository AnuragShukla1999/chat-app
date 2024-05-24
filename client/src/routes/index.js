import { createBrowserRouter } from "react-router-dom";
import AuthLayouts from "../layout.js";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "register",
                element: <AuthLayouts><RegisterPage /></AuthLayouts>
            },

            {
                path : "email",
                element : <AuthLayouts><CheckEmailPage/></AuthLayouts>
            },

            {
                path : "password",
                element : <AuthLayouts><CheckEmailPage/></AuthLayouts>
            },

            {
                path : "forgot-password",
                element : <AuthLayouts><Forgotpassword/></AuthLayouts>
            },

            {
                path : "",
                element : <Home/>,
                children : [
                    {
                        path : ':userId',
                        element : <MessagePage/>
                    }
                ]
            }
        ]
    }
]);


export default router