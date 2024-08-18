
export const signUp = async (req, res) => {
    try {
        res.send("SignUp routes")

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" })
    }
}

export const login = async (req, res) => {
    try {
        res.send("Login routes")

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" })
    }
}

export const logout = async (req, res) => {
    try {
        res.send("Logout routes")

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" })
    }
}