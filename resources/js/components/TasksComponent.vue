<template>
    <div class="tasks">
<!--        <div class="create">
            <input type="text" class="create__task form-control mb-3" v-model="title">
            <input type="text" class="create__task form-control" v-model="body">
            <button class="form-control" @click.prevent="submit">Add task</button>
        </div>-->
        <div class="tasks__list">
            <div class="task" v-for="(task, index) in getTasks()" :key="index">
                <div class="row">
                    <div class="col-md-5">
                        {{ task.title }}
                    </div>
                    <div class="col-md-7">
                        {{ task.body }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapMutations, mapGetters, mapActions} from 'vuex';

    export default {
        props: ["type"],
        data() {
            return {
                title: "",
                body: "",
                limit: 15
            }
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
            },
            beforeEnter: function (el) {
                el.style.opacity = 0
                el.style.height = 0
            },
            enter: function (el, done) {
                //var delay = el.tasks.index * 150
                let delay = 150;

                console.log(el);
                /*setTimeout(function () {
                    Velocity(
                        el,
                        { opacity: 1, height: '1.6em' },
                        { complete: done }
                    )
                }, delay)*/
            },
            leave: function (el, done) {

            }
        },
    }
</script>
