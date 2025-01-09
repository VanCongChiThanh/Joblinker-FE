<template>
<div>
    <NavBar class="fixed-top" />
    <div class="container-fluid" style="padding: 200px 0 150px 0">
        <div class="d-flex justify-content-center align-items-center vh-100">
            <div class="form p-4">
                <h1 class="text-center mb-4 font-weight-bold">Đăng ký tài khoản</h1>

                <!-- Điều khoản -->
                <div class="form-group">
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="agreeGoogleTerms" />
                        <label class="custom-control-label" for="agreeGoogleTerms">
                            Bằng việc đăng ký bằng tài khoản Google, bạn đồng ý với các
                            <a href="#" class="text-primary">Điều khoản dịch vụ</a> và
                            <a href="#" class="text-primary">Chính sách quyền riêng tư</a>.
                        </label>
                    </div>
                </div>

                <!-- Nút đăng ký Google -->
                <button class="btn btn-danger btn-block mb-3 d-flex align-items-center justify-content-center">
                    <i class="fab fa-google mr-2"></i>
                    Đăng ký bằng Google
                </button>

                <div class="text-center text-muted my-3">HOẶC</div>

                <!-- Form đăng ký -->
                <form @submit.prevent="register">
                    <!-- Họ và Tên -->
                    <div class="form-group">
                        <label for="fullName">Họ và Tên</label>
                        <input type="text" id="fullName" class="form-control" placeholder="Nhập họ và tên" v-model="name" required />
                    </div>

                    <!-- Email -->
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" class="form-control" placeholder="Nhập email" v-model="email" required />
                    </div>

                    <!-- Mật khẩu -->
                    <div class="form-group">
                        <label for="password">Mật khẩu</label>
                        <input type="password" id="password" class="form-control" placeholder="Nhập mật khẩu" v-model="password" required />
                        <small class="form-text text-muted">
                            Ít nhất 12 ký tự, 1 ký tự đặc biệt (! @ # $ ...), 1 số, 1 chữ viết
                            hoa, và 1 chữ viết thường.
                        </small>
                    </div>

                    <!-- Điều khoản dịch vụ -->
                    <div class="form-group">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="agreeTerms" v-model="agreeTerms" required />
                            <label class="custom-control-label" for="agreeTerms">
                                Tôi đã đọc và đồng ý với các
                                <a href="#" class="text-primary">Điều khoản dịch vụ</a> và
                                <a href="#" class="text-primary">Chính sách quyền riêng tư</a>.
                            </label>
                        </div>
                    </div>

                    <!-- Nút đăng ký -->
                    <button type="submit" class="btn btn-primary btn-block" :disabled="!agreeTerms">
                        Đăng ký bằng Email
                    </button>
                </form>

                <!-- Đăng nhập -->
                <p class="text-center text-muted mt-3">
                    Bạn đã có tài khoản? <a href="/login" class="text-primary">Đăng nhập ngay!</a>
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
