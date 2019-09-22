<template>
    <vue-custom-scrollbar class="scroll-area"  :settings="settings">
        <ul class="nav flex-column flex-nowrap">
            <li class="nav-item active">
                <router-link
                    class="nav-link"
                    :to="{ name: 'tasks-all'}"
                >Все</router-link>
            </li>
            <li class="nav-item active">
                <router-link
                    class="nav-link"
                    :to="{ name: 'tasks-past-due'}"
                >Просроченные</router-link>
            </li>
            <li class="nav-item">
                <router-link
                    class="nav-link"
                    :to="{ name: 'tasks-today'}"
                >Сегодня</router-link>
            </li>
            <li class="nav-item">
                <router-link
                    class="nav-link"
                    :to="{ name: 'tasks-yesterday'}"
                >Вчера</router-link>
            </li>
            <li class="nav-item">
                <router-link
                    class="nav-link"
                    :to="{ name: 'tasks-last-7-days'}"
                >Последние 7 дней</router-link>
            </li>
            <li class="nav-item">
                Группы
            </li>
            <li class="nav-item">
                <router-link
                    class="nav-link"
                    :to="{ name: 'groups', params: {group: 'uncategorized'}}"
                >Без группы</router-link>
            </li>
            <li class="nav-item">
                <router-link
                    class="nav-link"
                    :to="{ name: 'groups', params: {group: 'work'}}"
                >Работа</router-link>
            </li>
            <li class="nav-item">
                <router-link
                    class="nav-link"
                    :to="{ name: 'groups', params: {group: 'studying'}}"
                >Учеба</router-link>
            </li>
            <li class="nav-item section-item" @click="toggleShowPriority">
                Приоритет
            </li>
            <li class="nav-item" :class="{active : showPriority}">
                <router-link
                    class="nav-link"
                    :to="{ name: 'priority', params: {priority: 'unprioritized'}}"
                >Без приоритета</router-link>
            </li>
            <li class="nav-item" :class="{active : showPriority}">
                <router-link
                    class="nav-link"
                    :to="{ name: 'priority', params: {priority: 'unimportant'}}"
                >Малозначимые</router-link>
            </li>
            <li class="nav-item" :class="{active : showPriority}">
                <router-link
                    class="nav-link"
                    :to="{ name: 'priority', params: {priority: 'important'}}"
                >Важные</router-link>
            </li>
            <li class="nav-item" :class="{active : showPriority}">
                <router-link
                    class="nav-link"
                    :to="{ name: 'priority', params: {priority: 'urgent'}}"
                >Срочные</router-link>
            </li>
        </ul>
    </vue-custom-scrollbar>
</template>

<script>
    import vueCustomScrollbar from 'vue-custom-scrollbar';

    export default {
        name: "MenuComponent",
        components: {vueCustomScrollbar},
        data() {
            return {
                showPriority : true,
                settings: {
                    maxScrollbarLength: 60
                }
            }
        },
        methods : {
            toggleShowPriority() {
                this.showPriority = !this.showPriority;
            }
        }
    }
</script>

<style scoped>

</style>
