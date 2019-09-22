<template>
    <vue-custom-scrollbar class="scroll-area"  :settings="settings">
        <div class="tasks">
    <!--        <div class="create">
                <input type="text" class="create__task form-control mb-3" v-model="title">
                <input type="text" class="create__task form-control" v-model="body">
                <button class="form-control" @click.prevent="submit">Add task</button>
            </div>-->
            <div class="tasks__list">
                <div class="task" v-for="(task, index) in getTasks()" :key="index">
                    <task-component :task="task"></task-component>
                </div>
            </div>
        </div>
    </vue-custom-scrollbar>
</template>

<script>
    import TaskComponent from "./TaskComponent";
    import vueCustomScrollbar from 'vue-custom-scrollbar';
    import {mapMutations, mapGetters, mapActions} from 'vuex';

    export default {
        props: ["type"],
        data() {
            return {
                title: "",
                body: "",
                limit: 15,
                settings: {
                    maxScrollbarLength: 60
                }
            }
        },
        components: {
            vueCustomScrollbar,
            TaskComponent
        },
        async mounted() {
            this.fetchTasks({
                route : this.$route.path,
                limit : this.limit
            });
        },
        watch: {
            '$route' (to, from) {
                this.fetchTasks({
                    route : this.$route.path,
                    limit : this.limit
                });
            }
        },
        methods: {
            ...mapMutations(["createTask"]),
            ...mapGetters(["getTasks"]),
            ...mapActions(["fetchTasks"]),
            submit() {
                this.createTask({
                    title: this.title,
                    body: this.body,
                    id: Date.now()
                });

                this.title = this.body = "";
            }
        },
    }
</script>
