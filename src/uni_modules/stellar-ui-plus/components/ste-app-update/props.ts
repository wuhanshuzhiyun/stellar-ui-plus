import type { PropType } from 'vue';
export default {
    Authorization: { type: String, default: () => 'Basic c2FiZXIzOnNhYmVyM19zZWNyZXQ=' },
    BladeAuth: {
        type: String,
        default: () =>
            'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJibGFkZXguY24iLCJhdWQiOlsiYmxhZGV4Il0sInRva2VuX3R5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJzYWJlcjMiLCJ0ZW5hbnRfaWQiOiI0ODI4MzEiLCJ1c2VyX2lkIjoiMTc3MjA5NjkzNjg3MjU3NDk3NyIsImRlcHRfaWQiOiIxNzcyMDk2OTM2MjcyNzg5NTA1IiwicG9zdF9pZCI6IjE3NzIwOTY5MzYzMTg5MjY4NTAiLCJyb2xlX2lkIjoiMTc3MjA5NjkzNTg5MTEwNzg0MiIsIm9hdXRoX2lkIjoiIiwiYWNjb3VudCI6ImFkbWluIiwidXNlcl9uYW1lIjoiYWRtaW4iLCJuaWNrX25hbWUiOiLnrqHnkIblkZgiLCJyZWFsX25hbWUiOiLnrqHnkIblkZgiLCJyb2xlX25hbWUiOiJhZG1pbiIsImRldGFpbCI6eyJ0eXBlIjoid2ViIiwiZGF0YVNjb3BlIjp7ImNoYWluQ2xpZW50SWQiOiIiLCJzdG9yZUlkIjoiIiwiY2hhbm5lbElkIjoiNjIwOTAxNyJ9fSwiZXhwIjoxNzYyOTEzNjQ4LCJuYmYiOjE3MzEzNzc2NDh9.WQMy9ixwsB3k3okaz8iEOgQJjHd2BRdTfRiAu6HSTSU',
    },
};
