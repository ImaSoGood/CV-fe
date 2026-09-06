<template>
    <footer class="footer">
        <div class="footer-content">
            <p>&copy; {{ currentYear }} Vladimir Kovalev</p>
            <div class="footer-links">
                <a href="https://linkedin.com" target="_blank">LinkedIn</a>
                <a href="https://github.com" target="_blank">GitHub</a>
                <span class="email">email@example.com</span>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
    width: 100%;
    background: #ffffff;
    border-top: 1px solid #e8ecf1;
    padding: 20px 40px;
    margin-top: auto;
}

.footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #5a6c7d;
    font-size: 14px;
}

.footer-links {
    display: flex;
    gap: 20px;
    align-items: center;
}

.footer-links a {
    color: #5a6c7d;
    text-decoration: none;
    transition: color 0.2s;
}

.footer-links a:hover {
    color: #2c3e50;
}

.footer-links .email {
    color: #5a6c7d;
    cursor: default;
}

@media (max-width: 768px) {
    .footer {
        padding: 16px 20px;
    }

    .footer-content {
        flex-direction: column;
        gap: 8px;
        text-align: center;
    }
}
</style>