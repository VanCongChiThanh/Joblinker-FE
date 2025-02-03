<template>
<div class="container">
    <div v-if="company" class="info-company card shadow-sm p-4 mb-3 bg-white">
        <button class="btn btn-link position-absolute" style="top: 10px; right: 10px;" title="Edit" data-toggle="modal" data-target="#exampleModal">
            <i class="fas fa-edit"></i>
        </button>
        <div class="d-flex justify-content-center align-items-center border rounded mx-auto" style="width: 15vw; height: 15vw; max-width: 100px; max-height: 100px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
            <img :src="`http://localhost:8080/storage/companyLogo/${company.logo}`" @error="setDefaultAvatar" alt="Company Logo" class="img-fluid" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
        </div>
        <div class="mt-3">
            <p><strong>Name:</strong> {{ company.name }}</p>
            <p><strong>Address:</strong> {{ company.address }}</p>
            <p><strong>Description:</strong> {{ company.description }}</p>
        </div>
    </div>
    <div v-else>
        <p>Loading company information...</p>
    </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">

            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Update Company</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 d-flex justify-content-center mb-4">
                                <img :src="`http://localhost:8080/storage/companyLogo/${companyForm.logo}`" @error="setDefaultAvatar" alt="Company Logo" class="img-fluid" style="max-width: 150px; max-height: 150px; object-fit: contain;" />
                            </div>
                            <div class="logo mx-auto">
                                <input @change="handleFileChange" type="file" class="form-control" id="logo">
                            </div>
                        </div>
                        <form id="updateForm" @submit.prevent="updateCompany">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" id="name" placeholder="Company name" v-model="companyForm.name">
                            <label for="address">Address</label>
                            <input type="text" class="form-control" id="address" placeholder="Company address" v-model="companyForm.address">
                            <label for="description">Description</label>
                            <textarea class="form-control" id="description" placeholder="Description" v-model="companyForm.description" rows="5"></textarea>
                        </form>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" form="updateForm">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
import {
    fetchCompanyByUserId,
    updateCompany
} from "@/services/companyService";
import {
    uploadFile
} from "@/services/fileService";

export default {
    name: "CompanyManagement",
    data() {
        return {
            company: null,
            companyForm: {
                name: "",
                address: "",
                description: "",
                logo: "",
            },
            selectedFile: null,
        };
    },
    computed: {
        ...mapState("auth", ["user"]),
    },
    methods: {
        setDefaultAvatar(event) {
            event.target.src = '/assets/images/company-avt-default.jpg';
        },

        async updateCompany() {
            try {
                const folder = "companyLogo";
                if (this.selectedFile) {
                    this.companyForm.logo = await uploadFile(this.selectedFile, folder);
                } else {
                    this.companyForm.logo = this.company.logo; 
                }
                await updateCompany(this.company.id, this.companyForm);

                this.company = {
                    ...this.companyForm
                };
                alert("Company updated successfully!");
                window.location.reload();
            } catch (error) {
                console.error("Error updating company:", error);
                alert("Error updating company.");
            }
        },
        handleFileChange(event) {
            this.selectedFile = event.target.files[0];
        },
    },
    async created() {
        if (this.user && this.user.id) {
            try {
                this.company = await fetchCompanyByUserId(this.user.id);
                this.companyForm.address = this.company.address
                this.companyForm.description = this.company.description
                this.companyForm.logo = this.company.logo;
                this.companyForm.name = this.company.name
            } catch (error) {
                console.error("Error fetching company:", error);
            }
        } else {
            console.warn("User is not logged in or user ID is missing.");
        }
    },
};
</script>

<style scoped>

</style>
