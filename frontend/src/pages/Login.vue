<script setup lang="ts">
import { ref } from 'vue'
import { useUserService } from '../api/userService'
import { useRouter } from 'vue-router'
import { useErrorUtil } from '../composables/useApplicationError'

const identifier = ref("")
const password = ref("")
const message = ref("")
const router = useRouter()

async function authenticate(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    const userService = useUserService()
    const result = await userService.login(identifier.value, password.value)
    if(useErrorUtil().isAppError(result)) {
        message.value = result.message
    } else {
        if(result.role.type == "admin") {
            router.push("/admin")
        } else {
            router.push("/")
        }
    }
}
</script>

<template>
    <div class="row justify-content-center">
        <div class="col-6 card" >
            <div class="card-body">
                <h5 class="card-title">Sign in</h5>
                <div class="alert alert-danger" role="alert" v-if="message">
                    {{ message }}
                </div>
                <form>
                    <div class="mb-3">
                        <label for="emailInput" class="form-label">Email:</label>
                        <input type="email" class="form-control" id="emailInput" placeholder="mail@mail.com" v-model="identifier" required>
                        <div class="invalid-feedback">
                            Você deve informar um email válido.
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="passwordInput" class="form-label">Password</label>
                        <input type="password" class="form-control" id="passwordInput" v-model="password" required>
                        <div class="invalid-feedback">
                            A senha é um campo obrigatório.
                        </div>
                    </div>
                    <div class="mb-3">
                        <input type="submit" class="float-end btn btn-primary" value="Enviar" @click="authenticate"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
</template>
