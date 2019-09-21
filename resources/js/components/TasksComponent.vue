<template>
    <div class="tasks">
        Tasks {{ $route.params.type }}
    </div>
</template>

<script>
    export default {
        watch: {
            '$route' (to, from) {
                console.log('Component mounted.' + this.$route.params.type);
            }
        }
    }
</script>
