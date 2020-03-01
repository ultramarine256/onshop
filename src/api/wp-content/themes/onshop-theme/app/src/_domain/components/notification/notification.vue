<template>
    <div class="notification">
        <span class="tiger">
            Notifications Component
        </span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                posts: [
                    {id: 1, title: 'My journey with Vue'},
                    {id: 2, title: 'Blogging with Vue'},
                    {id: 3, title: 'Why Vue is so fun'}
                ],
                body: 'I am a notification.'
            }
        }
    }
</script>

<style scoped>
    .notification .tiger {
        color: blue;
    }

</style>