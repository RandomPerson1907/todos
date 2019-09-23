<template>
    <div class="task__item">
        <div class="task__body" @dblclick="toggleAdditional">
            <div class="row h-100">
                <div class="col-md-11 pr-0">
                    <div class="task__title">
                        <router-link :to="{name : 'task', params: {id : task.id}}">{{ task.title }}</router-link>
                    </div>
                </div>
                <div class="col-md-1">
                    <div class="actions d-flex justify-content-end position-relative">
                        <button class="empty-button" @click="toggleAdditional">
                            <img src="/img/icons/more.png" alt="Actions">
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="additional-info" :class="{ active:  showAdditional }">
                    <div class="row">
                        <div class="col-md-4 border-right">
                            <h4>Срок</h4>
                            <datetime
                                type="datetime"
                                format="HH:mm:ss dd-MM-yyyy"
                                placeholder="Старт задачи"
                                :phrases="{ok: 'Далее', cancel: 'Выход'}"
                                v-model="task.datetimeStart"
                            ></datetime>
                            <datetime
                                type="datetime"
                                format="HH:mm:ss dd-MM-yyyy"
                                placeholder="Завершение задачи"
                                :phrases="{ok: 'Далее', cancel: 'Выход'}"
                                v-model="task.datetimeEnd"
                            ></datetime>
                        </div>
                        <div class="col-md-4 border-right">
                            <h4>Приоритет</h4>
                            <div class="priorities d-flex">
                                <div
                                    v-for="(priority, index) in priorities"
                                    class="priority"
                                    :class="{ active:  priority.checked }"
                                    :key="index"
                                    :title="priority.title"
                                >
                                    <button
                                        class="empty-button"
                                        @click="checkPriority(index)"
                                    >
                                        <img :src="`/img/icons/${priority.slug}.png`" :alt="priority.name">
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <h4 class="text-center">Действия</h4>
                            <div class="actions d-flex">
                                <div class="action">
                                    <b-button
                                        :id="`popover-copy-link-${task.id}`"
                                        class="empty-button"
                                        title="Скопировать ссылку"
                                        ref="button"
                                        variant="primary"
                                        v-clipboard:copy="taskLink"
                                        v-clipboard:success="copySuccess"
                                        v-clipboard:error="copyError"
                                    >
                                        <img src="/img/icons/link.png" alt="Copy link">
                                    </b-button>
                                    <b-popover
                                        :target="`popover-copy-link-${task.id}`"
                                        :show.sync="popovers.copyLink.show"
                                        :placement="popovers.copyLink.placement"
                                    >
                                        {{ popovers.copyLink.text }}
                                    </b-popover>
                                </div>
                                <div class="action">
                                    <b-button
                                        :id="`popover-move-tomorrow-${task.id}`"
                                        class="empty-button"
                                        title="Перенести на завтра"
                                        ref="button"
                                        variant="primary"
                                        @click="moveTomorrow"
                                    >
                                        <img src="/img/icons/calendar.png" alt="Move to tomorrow">
                                    </b-button>
                                    <b-popover
                                        :target="`popover-move-tomorrow-${task.id}`"
                                        :show.sync="popovers.moveTomorrow.show"
                                        :placement="popovers.moveTomorrow.placement"
                                    >
                                        {{ popovers.moveTomorrow.text }}
                                    </b-popover>
                                </div>
                                <div class="action">
                                    <button
                                        class="empty-button"
                                        title="Дублировать"
                                        @click="duplicate"
                                    >
                                        <img src="/img/icons/duplicate.png" alt="Duplicate">
                                    </button>
                                </div>
                                <div class="action">
                                    <button
                                        class="empty-button"
                                        title="Перенести в группу"
                                        @click="moveToGroup"
                                    >
                                        <img src="/img/icons/move.png" alt="Move to group">
                                    </button>
                                </div>
                                <div class="action">
                                    <button
                                        class="empty-button"
                                        title="Удалить"
                                        @click="deleteTask"
                                    >
                                        <img src="/img/icons/delete.png" alt="Delete">
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 p-0">
                            <button
                                class="empty-button save p-0"
                                @click="save"
                            >
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    import { Datetime } from 'vue-datetime';
    import 'vue-datetime/dist/vue-datetime.css'

    export default {
        name: "TaskComponent",
        props: ["task"],
        components: {
            Datepicker,
            datetime: Datetime,
        },
        data() {
            return {
                popovers : {
                    copyLink : {
                        show : false,
                        text : "",
                        phrases : {
                            ok : "Ссылка успешно скопирована",
                            error : "Скопировать ссылку не удалось"
                        },
                        placement : "bottom",
                    },
                    moveTomorrow : {
                        show : false,
                        text : "",
                        phrases : {
                            ok : "Задача успешно перенесена на завтра",
                            error : "Перенести задачу на завтра не удалось",
                        },
                        placement : "bottom",
                    }
                },
                showAdditional : false,
                priorities: [
                    {
                        name : "Priority 1",
                        title: "Приоритет 1",
                        slug: "priority-1",
                        checked: true
                    },
                    {
                        name : "Priority 2",
                        title: "Приоритет 2",
                        slug: "priority-2",
                        checked: false
                    },
                    {
                        name : "Priority 3",
                        title: "Приоритет 3",
                        slug: "priority-3",
                        checked: false
                    },
                    {
                        name : "Priority 4",
                        title: "Приоритет 4",
                        slug: "priority-4",
                        checked: false
                    }
                ]
            }
        },
        computed: {
            taskLink() {
                return this.$router.resolve({name: 'task', params: {id : this.task.id}}).href;
            }
        },
        methods: {
            copySuccess() {
                this.popovers.copyLink.text = this.popovers.copyLink.phrases.ok;
                this.showPopover("copyLink");
            },
            copyError() {
                this.popovers.copyLink.text = this.popovers.copyLink.phrases.error;
                this.showPopover("copyLink");
            },
            showPopover(popoverName) {
                this.popovers[popoverName].show = true;
                setTimeout(() => {
                    this.popovers[popoverName].show = false;
                }, 2000);
            },
            moveTomorrow() {
                this.popovers.moveTomorrow.text = this.popovers.moveTomorrow.phrases.ok;
                this.showPopover("moveTomorrow");
            },
            toggleAdditional() {
                this.showAdditional = !this.showAdditional;
            },
            checkPriority(priorityIndex) {
                this.priorities.forEach((item, index) => {
                    if (item.checked) {
                        this.priorities[index].checked = false;
                    } else if (index === priorityIndex) {
                        this.priorities[index].checked = true;
                    }
                })
            },
            duplicate() {
              console.log("duplicate");
            },
            moveToGroup() {
                console.log("move to group");
            },
            deleteTask() {
                console.log("delete task");
            },
            save() {
                console.log("save");
            }
        }
    }
</script>

<style scoped>

</style>
