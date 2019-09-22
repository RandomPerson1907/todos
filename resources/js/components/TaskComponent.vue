<template>
    <div class="task__item">
        <div class="row h-100">
            <div class="col-md-5 pr-0">
                {{ task.title }}
            </div>
            <div class="col-md-6 pr-0">
                {{ task.body }}
            </div>
            <div class="col-md-1">
                <div class="actions d-flex justify-content-end position-relative">
                    <button @click="toggleAdditional">
                        <img src="/img/icons/more.png" alt="Actions">
                    </button>
                </div>
            </div>
        </div>
        <div class="row" v-if="showAdditional">
            <div class="col-md-12 p-0">
                <div class="additional-info">
                    Additional info
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';

    export default {
        name: "TaskComponent",
        props: ["task"],
        components: {
            Datepicker
        },
        data() {
            return {
                showAdditional : false
            }
        },
        methods: {
            toggleAdditional() {
                this.showAdditional = !this.showAdditional;
            },
        }
    }
</script>

<style scoped>

</style>
