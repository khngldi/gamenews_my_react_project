import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import AppRoute from "./components/AppRoute";
import { AuthProvider } from "./components/AuthContext";

export default function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <Router>
                    <div className="min-h-screen flex flex-col">
                        <Header />
                        <main className="flex-1">
                            <AppRoute />
                        </main>
                        <Footer />
                    </div>
                </Router>
            </ThemeProvider>
        </AuthProvider>
    );
}