<template>
<div>
    <NavBar class="fixed-top" />
    <div class="container-fluid">
        <div class="row">
            <div class="banner col-6">
                <h1 class="mt-2 mb-5 ">Xây dựng <b>Sự nghiệp<br><span class="text-primary">thành công</span></b> cùng<br>joblinker.vn</h1>
            </div>
            <div class="login-container col-6  p-3">
                <div class="login-form mx-auto">
                    <h5 class="text-center text-dark mb-3">Người tìm việc đăng nhập</h5>
                    <form @submit.prevent="handleLogin">
                        <div class="form-group">
                            <input type="email" v-model="loginData.username" placeholder="Email" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <input type="password" v-model="loginData.password" placeholder="Mật khẩu" class="form-control" required />
                        </div>
                        <div class="form-check">
                            <input type="checkbox" id="show-password" class="form-check-input" />
                            <label for="show-password" class="form-check-label">Hiển thị mật khẩu</label>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
                        <p class="text-center mt-2">
                            <small>Hoặc</small>
                        </p>
                        <div class="social-login-buttons">
                            <button class="btn btn-light w-100 mb-2" @click="loginWithGoogle" type="button">
                                <i class="fab fa-google"></i> Đăng nhập với Google
                            </button>

                            <button class="btn btn-light w-100" type="button">
                                <i class="fab fa-linkedin"></i> Đăng nhập với LinkedIn
                            </button>
                        </div>
                        <p class="text-center mt-3">
                            Chưa có tài khoản? <a href="/register">Đăng ký</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <Footer></Footer>
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
import NavBar from "@/components/client/NavBar.vue";
import Footer from "@/components/client/SiteFooter.vue";

export default {
    name: "LoginPage",
    components: {
        NavBar,
        Footer,
    },
    data() {
        return {
            loginData: {
                username: "",
                password: "",
            },
        };
    },
    methods: {
        ...mapActions("auth", ["login"]),
        async handleLogin() {
            try {
                await this.login({
                    username: this.loginData.username,
                    password: this.loginData.password
                });
                this.$router.push("/");
            } catch (error) {
                console.error("Login error:", error.data);
            }
        },
        loginWithGoogle() {
            window.location.href = "http://localhost:8080/oauth2/authorization/google";
        },
    },
};
</script>

<style scoped>
html,
body {
    height: 100%;
}

.container-fluid {
    margin-top: 72px;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.banner {
    background-image: url('../../../public/assets/images/banner-login.png');
    background-size: 70%;
    background-position: bottom center;
    background-repeat: no-repeat;
    color: white;
    padding: 50px 0;
    text-align: center;
}

.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 20px 0;

}

.login-form {
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    width: 100%;
    min-width: 300px;
    transition: box-shadow 0.3s ease;
}

.login-form:hover {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
}

.form-group {
    margin-bottom: 10px;
}

button {
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    padding: 8px;
}

button:hover {
    background-color: #0056b3;
}

.social-login-buttons button {
    background-color: #f1f1f1;
    border-radius: 4px;
    padding: 8px;
}

.social-login-buttons button i {
    margin-right: 10px;
}

@media (max-width: 768px) {
    .banner {
        display: none;
    }

    .login-container {
        margin: auto;
    }
}
</style>
