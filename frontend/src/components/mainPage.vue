<template>
    <div class="main">
        <div class="main__inside">
            <div class="top">
                <h1>Tasks</h1>
                <div class="buttons">
                    <svg @click="() => tableView = !tableView" v-if="tableView" xmlns="http://www.w3.org/2000/svg"
                        id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512">
                        <path
                            d="M21,9H3c-1.65,0-3,1.35-3,3s1.35,3,3,3H21c1.65,0,3-1.35,3-3s-1.35-3-3-3Zm0,4H3c-.55,0-1-.45-1-1s.45-1,1-1H21c.55,0,1,.45,1,1s-.45,1-1,1ZM3,6H15c1.65,0,3-1.35,3-3s-1.35-3-3-3H3C1.35,0,0,1.35,0,3s1.35,3,3,3Zm0-4H15c.55,0,1,.45,1,1s-.45,1-1,1H3c-.55,0-1-.45-1-1s.45-1,1-1Zm6,16H3c-1.65,0-3,1.35-3,3s1.35,3,3,3h6c1.65,0,3-1.35,3-3s-1.35-3-3-3Zm0,4H3c-.55,0-1-.45-1-1s.45-1,1-1h6c.55,0,1,.45,1,1s-.45,1-1,1Z" />
                    </svg>
                    <svg @click="() => tableView = !tableView" v-if="!tableView" xmlns="http://www.w3.org/2000/svg"
                        id="Outline" viewBox="0 0 24 24" width="512" height="512">
                        <path
                            d="M7,0H4A4,4,0,0,0,0,4V7a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V4A4,4,0,0,0,7,0ZM9,7A2,2,0,0,1,7,9H4A2,2,0,0,1,2,7V4A2,2,0,0,1,4,2H7A2,2,0,0,1,9,4Z" />
                        <path
                            d="M20,0H17a4,4,0,0,0-4,4V7a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V4A4,4,0,0,0,20,0Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V4a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z" />
                        <path
                            d="M7,13H4a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V17A4,4,0,0,0,7,13Zm2,7a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2H7a2,2,0,0,1,2,2Z" />
                        <path
                            d="M20,13H17a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V17A4,4,0,0,0,20,13Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z" />
                    </svg>
                </div>
            </div>
            <div :class="{ 'bottom list': !tableView, 'bottom table': tableView }">
                <router-link to="/addNew">
                    <button class="addNewTask">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                            id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;"
                            xml:space="preserve" width="512" height="512">
                            <g>
                                <path
                                    d="M480,224H288V32c0-17.673-14.327-32-32-32s-32,14.327-32,32v192H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h192v192   c0,17.673,14.327,32,32,32s32-14.327,32-32V288h192c17.673,0,32-14.327,32-32S497.673,224,480,224z" />
                            </g>
                        </svg>
                    </button>
                </router-link>
                <div v-if="tasks.filter(task => !task.completed).length > 0" class="tasks uncomplete">
                    <h4>Uncompleted Tasks</h4>
                    <div class="tasks1">
                        <div v-for="(task, index) in tasks.filter(task => !task.completed)" :key="index" class="task">
                            <router-link :to="'/task/' + task._id">
                                <div class="text">
                                    <p class="number">Task {{ index + 1 }}</p>
                                    <p class="heading">{{ task.header }}</p>
                                    <p class="context">{{ task.context }}</p>
                                </div>
                            </router-link>
                            <button @click="() => checkTask(task._id)" class="complete"></button>
                        </div>
                    </div>
                </div>
                <div v-if="tasks.filter(task => task.completed).length > 0" class="complete tasks">
                    <h4>Completed Tasks</h4>
                    <div class="tasks2">
                        <div v-for="(task, index) in tasks.filter(task => task.completed)" :key="index" class="task">
                            <div class="text">
                                <p class="number">Task {{ index + 1 }}</p>
                                <p class="heading">{{ task.header }}</p>
                                <p class="context">{{ task.context }}</p>
                            </div>
                            <button @click="() => uncheckTask(task._id)" class="complete">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 507.506 507.506"
                                    style="enable-background:new 0 0 507.506 507.506;" xml:space="preserve" width="512"
                                    height="512">
                                    <g>
                                        <path
                                            d="M163.865,436.934c-14.406,0.006-28.222-5.72-38.4-15.915L9.369,304.966c-12.492-12.496-12.492-32.752,0-45.248l0,0   c12.496-12.492,32.752-12.492,45.248,0l109.248,109.248L452.889,79.942c12.496-12.492,32.752-12.492,45.248,0l0,0   c12.492,12.496,12.492,32.752,0,45.248L202.265,421.019C192.087,431.214,178.271,436.94,163.865,436.934z" />
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div v-if="tasks.length == 0" class="no">
                    <p>no tasks yet</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

interface Task {
    _id: string;
    header: string;
    context: string;
    completed: boolean;
}

export default defineComponent({
    name: 'MainPage',
    setup() {
        const tasks = ref<Task[]>([]);
        const tableView = ref<boolean>(false)

        const getAllTasks = async () => {

            try {
                const response = await fetch('http://localhost:3000/api/getTasks', {
                    method: 'GET'
                })

                const data = await response.json();
                tasks.value = data.tasks

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        const checkTask = async (taskId: string) => {
            try {
                const response = await fetch('http://localhost:3000/api/updateTask', {
                    method: 'POST',
                    body: JSON.stringify({
                        id: taskId,
                        completed: true,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })

                const data = await response.json();

                getAllTasks()
            } catch (err) {
                console.log(err);
            }
        };

        const uncheckTask = async (taskId: string) => {
            try {
                const response = await fetch('http://localhost:3000/api/updateTask', {
                    method: 'POST',
                    body: JSON.stringify({
                        id: taskId,
                        completed: false,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })

                const data = await response.json();

                getAllTasks()
            } catch (err) {
                console.log(err);
            }
        };

        const methods = {
            getAllTasks,
            checkTask,
            uncheckTask
        };



        onMounted(() => {
            getAllTasks();
        })

        return {
            tasks,
            tableView,
            ...methods
        };
    }
});
</script>

<style lang="scss">
.main {
    width: 100%;
    height: 100%;
    padding: 30px;
    background-color: rgba(0, 0, 0, 0.01);
    min-height: 100vh;

    ::-webkit-scrollbar {
        display: none !important;
    }

    .main__inside {
        position: relative;
        width: 100%;
        min-height: calc(100vh - 60px);
        max-height: calc(100vh - 60px);
        overflow-y: scroll;
        scrollbar-width: 0;
        box-shadow: var(--shadow);
        border: 1px rgba(0, 0, 0, 0.01) solid;
        border-radius: 30px;
        background-color: white;

        .top {
            width: 100%;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px #000a2d5f solid;
            height: 80px;

            h1 {
                color: var(--dark-blue);
            }

            .buttons {
                display: flex;
                gap: 30px;
                margin-right: 15px;

                svg {
                    width: 25px;
                    height: 25px;
                    fill: var(--dark-blue);
                    cursor: pointer;
                }
            }
        }

        .bottom {
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 50px;
            margin-bottom: 200px;

            .no {
                position: absolute;
                top: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;

                p {
                    font-size: 44px;
                    opacity: 0.6;
                    text-transform: capitalize;
                    font-weight: 500;
                }
            }

            .addNewTask {
                position: fixed;
                width: 80px;
                height: 80px;
                border-radius: 80px;
                background-color: var(--dark-blue);
                outline: 0;
                border: 0;
                bottom: 60px;
                right: 60px;
                padding: 25px;
                z-index: 3;
                cursor: pointer;

                svg {
                    max-width: 100%;
                    max-height: 100%;
                    fill: var(--milk);
                }
            }

            .tasks {
                display: flex;
                flex-direction: column;
                gap: 20px;

                h4 {
                    padding-left: 10px;
                    font-weight: 400;
                    color: var(--dark-blue);
                }

                .task {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px;
                    border-bottom: 1px #000a2d5f solid;

                    .text {
                        display: flex;
                        flex-direction: column;
                        gap: 8px;

                        .number {
                            font-size: 14px;
                            opacity: 0.8;
                            color: var(--dark-blue);

                        }

                        .heading {
                            font-size: 24px;
                            font-weight: 500;
                            color: var(--dark-blue);

                        }

                        .context {
                            font-size: 15px;
                            color: var(--dark-blue);

                        }
                    }

                    .complete {
                        width: 30px;
                        height: 30px;
                        background: white;
                        border: 0;
                        outline: 0;
                        border-radius: 5px;
                        border: 1px var(--dark-blue) solid;
                        padding: 5px;
                        cursor: pointer;

                        svg {
                            width: 100%;
                            height: 100%
                        }
                    }

                    &:hover {
                        box-shadow: var(--shadow);
                        cursor: pointer;
                    }
                }
            }

            .complete {

                .task {
                    opacity: 0.6;
                    text-decoration: line-through;

                    p {
                        color: var(--dark-blue);
                    }
                }
            }
        }

        .table {

            .tasks1 , .tasks2 {
                display: grid;
                grid-template-columns: auto auto;
                gap: 10px;
            }
        }
    }
}
</style>