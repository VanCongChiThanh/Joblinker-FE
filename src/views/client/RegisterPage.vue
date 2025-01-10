<template>
<div>
    <NavBar class="fixed-top" />
    <div class="container-fluid" style="padding: 200px 0 150px 0">
        <div class="d-flex justify-content-center align-items-center vh-100">
            <div class="form p-4">
                <h1 class="text-center mb-4 font-weight-bold">Sign up</h1>

                <div class="form-group">
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="agreeGoogleTerms" />
                        <label class="custom-control-label" for="agreeGoogleTerms">
                            By signing up with Google, I agree to Joblinker's
                            <a href="#" class="text-primary">Terms & Conditions </a> and
                            <a href="#" class="text-primary">Privacy Policy</a>
                            in relation to your privacy information.
                        </label>
                    </div>
                </div>

                <button class="btn btn-danger btn-block mb-3 d-flex align-items-center justify-content-center">
                    <i class="fab fa-google mr-2"></i>
                    Sign up with Google
                </button>

                <div class="text-center text-muted my-3">OR</div>

                <form @submit.prevent="register">
                    <div class="form-group">
                        <label for="fullName">Your name <span style="color: red;">*</span></label>
                        <input type="text" id="fullName" class="form-control" placeholder="Enter your name" v-model="name" required />
                    </div>

                    <div class="form-group">
                        <label for="fullName">Email <span style="color: red;">*</span></label>
                        <input type="email" id="email" class="form-control" placeholder="Enter your email" v-model="email" required />
                    </div>

                    <div class="form-group">
                        <label for="password">Mật khẩu<span style="color: red;">*</span></label>
                        <input type="password" id="password" class="form-control" placeholder="Enter password" v-model="password" required />
                        <small class="form-text text-muted">
                            At least 12 characters, 1 sympols (! @ # $ ...), 1 number, 1 uppercase letter, và 1 lowercase letter.
                        </small>
                    </div>

                    <div class="form-group">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="agreeTerms" v-model="agreeTerms" required />
                            <label class="custom-control-label" for="agreeTerms">
                                I have read and agree to Joblinker's
                                <a href="#" class="text-primary">Terms & Condition</a> and
                                <a href="#" class="text-primary">Privacy Policy</a>.
                            </label>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary btn-block" :disabled="!agreeTerms">
                        Sign up with Email
                    </button>
                </form>
                <p class="text-center mt-3">
                    Already have an account? <a href="/login" class="text-primary"> Sign in now!</a>
                </p>
            </div>
        </div>
    </div>
    <Footer></Footer>
</div>
</template>

<script>
import NavBar from "@/components/client/NavBar.vue";
import Footer from "@/components/client/SiteFooter.vue";
import authService from "@/services/authService";
export default {
    name: "LoginPage",
    components: {
        NavBar,
        Footer,
    },
    data() {
        return {
            name: "",
            email: "",
            password: "",
            agreeTerms: false,
        };
    },
    methods: {
        async register() {
            if (!this.agreeTerms) {
                alert("Bạn cần đồng ý với điều khoản để tiếp tục.");
                return;
            }

            try {
                const response = await authService.register({
                    name: this.name,
                    email: this.email,
                    password: this.password,
                });
                alert("Đăng ký thành công!");
                console.log("Server Response:", response);
            } catch (error) {
                alert("Đăng ký thất bại!");
                console.error("Registration Error:", error);
            }
        },
    },
};
</script>

<style scoped>
.form {
    width: 100%;
}

@media (min-width: 576px) {
    .form {
        width: 75%;
    }
}

@media (min-width: 992px) {
    .form {
        width: 60%;
    }
}

@media (min-width: 1200px) {
    .form {
        width: 50%;
    }
}
</style>
