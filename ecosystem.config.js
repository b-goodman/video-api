module.exports = {
	apps : [{
		name: "video-api",
		script: "./dist/server.js",
		append_env_to_name: false,
		merge_logs: true,
		autorestart: false,
		watch: false,
		max_memory_restart: "1G",
		instances: 1,
	}]
};