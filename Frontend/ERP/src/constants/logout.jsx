import Cookies from "js-cookie";

const logout = () => {

    // clear cookies and local storage here
    const cookies = Cookies.get();

    for (const cookieName in cookies) {
        Cookies.remove(cookieName);
    }
    window.location.replace('/')
}

export default logout