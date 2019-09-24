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
            <li class="nav-item d-flex justify-content-between">
                Группы <img class="h-25px add__group__button" src="/img/icons/plus.png" alt="Add group" @click="showAddGroupModal">
            </li>
            <li class="nav-item" v-for="group in getGroups">
                <router-link
                    class="nav-link"
                    :to="{ name: 'groups', params: {group: group.slug}}"
                >
                    {{ group.title }}
                </router-link>
                <span class="group__delete">
                    <button class="circled" @click="deleteGroup(group.id)">
                        <img src="/img/icons/minus.png" alt="Delete group">
                    </button>
                </span>
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
        <modal
            height="auto"
            name="addGroupModal"
        >
            <label class="d-flex flex-column justify-content-center container">
                <h4 class="text-center">Добавить новую группу</h4>
                <div class="errors" v-for="error in errors">
                    <div class="alert alert-warning" role="alert" v-for="errorMessage in error">
                        {{ errorMessage }}
                    </div>
                </div>
                <div class="alert alert-success" role="alert" v-if="success">
                    {{ success }}
                </div>
                <input
                    class="form-control"
                    type="text"
                    placeholder="Имя новой группы..."
                    v-model="title"
                    :class="{ error : titleError }"
                >
            </label>
            <div class="row">
                <div class="col-12">
                    <button
                        class="empty-button save"
                        @click="addGroup"
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </modal>
    </vue-custom-scrollbar>
</template>

<script>
    import { mapGetters } from 'vuex';
    import vueCustomScrollbar from 'vue-custom-scrollbar';

    const GROUP_HAS_BEEN_ADDED = 'Группа успешно добавлена';

    export default {
        name: "MenuComponent",
        components: {vueCustomScrollbar},
        data() {
            return {
                showPriority : true,
                title : "",
                success : "",
                errors : [],
                titleError : false,
                settings: {
                    maxScrollbarLength: 60
                }
            }
        },
        computed: {
            ...mapGetters(["getGroups", "newGroup"])
        },
        methods : {
            toggleShowPriority() {
                this.showPriority = !this.showPriority;
            },
            showAddGroupModal() {
                this.$modal.show("addGroupModal");
            },
            async addGroup() {
                if (!this.title.trim().length) {
                    this.titleError = true;
                } else {
                    this.clear();

                    await this.$store.dispatch("addGroup", this.title.trim()).then(() => {
                        if (this.newGroup.result) {
                            this.success = GROUP_HAS_BEEN_ADDED;
                        } else {
                            this.errors = this.newGroup.errors;
                        }

                        setTimeout(() => {
                            this.$modal.hide("addGroupModal");
                        }, 2000);
                    });
                }
            },
            deleteGroup(id) {
                this.$store.dispatch("deleteGroup", id);
            },
            clear() {
                this.titleError = false;
                this.success = "";
                this.errors = [];
            },
        }
    }
</script>

<style scoped>

</style>
