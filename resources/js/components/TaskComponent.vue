<template>
    <div class="task__item">
        <div class="task__body">
            <div class="row h-100">
                <div class="col-md-11 pr-0">
                    {{ task.title }}
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
                        <div class="col-md-4">
                            <h4>Срок</h4>
                            <datepicker class="mb-3" placeholder="Дата начала задачи"></datepicker>
                            <datepicker placeholder="Дата окончания задачи"></datepicker>
                        </div>
                        <div class="col-md-4">
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
                                    <button title="Скопировать ссылку" class="empty-button">
                                        <img src="/img/icons/link.png" alt="Copy link">
                                    </button>
                                </div>
                                <div class="action">
                                    <button title="Перенести на завтра" class="empty-button">
                                        <img src="/img/icons/calendar.png" alt="Move to tomorrow">
                                    </button>
                                </div>
                                <div class="action">
                                    <button title="Дублировать" class="empty-button">
                                        <img src="/img/icons/duplicate.png" alt="Duplicate">
                                    </button>
                                </div>
                                <div class="action">
                                    <button title="Перенести в группу" class="empty-button">
                                        <img src="/img/icons/move.png" alt="Move to group">
                                    </button>
                                </div>
                                <div class="action">
                                    <button title="Удалить" class="empty-button">
                                        <img src="/img/icons/delete.png" alt="Delete">
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 p-0">
                            <button class="empty-button save p-0">
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

    export default {
        name: "TaskComponent",
        props: ["task"],
        components: {
            Datepicker
        },
        data() {
            return {
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
        methods: {
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
            }
        }
    }
</script>

<style scoped>

</style>
