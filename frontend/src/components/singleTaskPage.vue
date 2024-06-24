<template>
    <div v-if="opened2" class="deadlineWindow">
        <form>
            <input v-model="deadline" type="date">
            <button @click="(e) => {
                e.preventDefault();
                opened = false;
                opened2 = false;
                opened3 = false
            }">Submit</button>
        </form>
    </div>
    <div v-if="opened3" class="extensionsWindow">
        <form>
            <input v-model="extension.name" placeholder="name" type="text">
            <input v-model="extension.text" placeholder="text" type="text">
            <button @click="(e) => {
                e.preventDefault();
                opened = false;
                opened2 = false;
                opened3 = false;
                addExtension()
            }">Submit</button>
        </form>
    </div>
    <div class="singlePage">
        <div v-if="task" class="inside">
            <div class="top">
                <div class="left">
                    <router-link to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512"
                            height="512">
                            <path
                                d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z" />
                        </svg>
                    </router-link>
                    <div class="text">
                        <h1>Task {{ task.taskNum }}</h1>
                        <div class="p">{{ new Date().getDate() + '.' + new Date().getMonth() + '.' + new
                            Date().getFullYear() }}</div>
                    </div>
                </div>
                <div class="middle">
                    <p @click="() => {
                        opened = false;
                        opened2 = true;
                        opened3 = false;
                    }">Deadline</p>
                    <p v-if="!deadline">Change deadline</p>
                    <p v-else> {{ deadline }}</p>
                </div>
                <div class="right">
                    <button @click="checkTask" v-if="!completed" class="complete"></button>
                    <button class="complete" @click="checkTask" v-else>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                            id="Capa_1" x="0px" y="0px" viewBox="0 0 507.506 507.506"
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
            <div class="bottom">
                <div v-if="hashtagWindow" class="hashtagWindow">
                    <div class="topPart">
                        <form>
                            <input v-model="hashtag" placeholder="hashtags..." type="text">
                            <button @click="(e) => {
                                e.preventDefault()
                                addHashtags(e);
                            }">ok</button>
                        </form>
                        <div class="hashtags">
                            <div v-if="hashtags.length > 0" class="allhashtags">
                                <div v-for="(hashtag, index) in hashtags" :key="index" class="single">
                                    <p>{{ hashtag }}</p>
                                    <svg @click="() => deleteHashtag(index)" xmlns="http://www.w3.org/2000/svg"
                                        id="Outline" viewBox="0 0 24 24" width="512" height="512">
                                        <path
                                            d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" />
                                    </svg>
                                </div>
                            </div>
                            <div v-if="hashtags.length === 0" class="nohashtags">
                                <p>No hashtags yet</p>
                            </div>
                        </div>
                    </div>
                    <button @click="() => {
                        opened3 = false;
                        opened2 = false;
                        opened = false;
                        hashtagWindow = false
                    }" class="submit">Submit</button>
                </div>
                <div class="heading">
                    <p class="name">Heading</p>
                    <textarea v-model="header"></textarea>
                </div>
                <div class="context">
                    <p class="name">Context</p>
                    <textarea v-model="context"></textarea>
                </div>
                <div v-if="hashtags.length > 0 && !hashtagWindow" class="allhashtags">
                    <p class="name">Hashtags</p>
                    <div v-for="(hashtag, index) in hashtags" :key="index" class="single">
                        <p>{{ hashtag }}</p>
                        <svg @click="() => deleteHashtag(index)" xmlns="http://www.w3.org/2000/svg" id="Outline"
                            viewBox="0 0 24 24" width="512" height="512">
                            <path
                                d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" />
                        </svg>
                    </div>
                </div>
                <div v-if="extensions.length > 0" class="extensions">
                    <h4>Extensions</h4>
                    <div v-for="(extension, index) in extensions" :key="index" class="extension">
                        <p class="name">{{ extension.name }}</p>
                        <p class="text">{{ extension.text }}</p>
                    </div>
                </div>

                <img v-if="imageurl !== ''" :src="imageurl" class="image" />

                <div class="add">
                    <div class="buttons">
                        <div class="file-input-container">
                            <label class="file-input-label">
                                <input type="file" @change="handleFileUpload" accept="image/*" class="file-input" />
                                <svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode"
                                    viewBox="0 0 24 24" width="512" height="512" class="svg-icon">
                                    <path
                                        d="M9.145,24A8.994,8.994,0,0,1,2.782,8.647L9.526,1.9a6.5,6.5,0,0,1,9.189,9.19l-6.742,6.743a4,4,0,0,1-5.656-5.656l6.39-6.389,2.12,2.121L8.438,14.3a1,1,0,1,0,1.414,1.414L16.6,8.973a3.5,3.5,0,1,0-4.949-4.949L4.9,10.767a6,6,0,0,0,8.484,8.484l6.389-6.39L21.9,14.982l-6.39,6.39A8.973,8.973,0,0,1,9.145,24Z" />
                                </svg>
                            </label>
                        </div>
                        <svg @click="() => {
                            opened = false;
                            opened2 = false;
                            opened3 = true
                        }" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"
                            width="512" height="512">
                            <path
                                d="M17,12c0,.828-.671,1.5-1.5,1.5h-2v2c0,.828-.671,1.5-1.5,1.5s-1.5-.672-1.5-1.5v-2h-2c-.829,0-1.5-.672-1.5-1.5s.671-1.5,1.5-1.5h2v-2c0-.828,.671-1.5,1.5-1.5s1.5,.672,1.5,1.5v2h2c.829,0,1.5,.672,1.5,1.5Zm7-6.5v13c0,3.032-2.467,5.5-5.5,5.5H5.5c-3.033,0-5.5-2.468-5.5-5.5V5.5C0,2.468,2.467,0,5.5,0h13c3.033,0,5.5,2.468,5.5,5.5Zm-3,0c0-1.379-1.122-2.5-2.5-2.5H5.5c-1.378,0-2.5,1.121-2.5,2.5v13c0,1.379,1.122,2.5,2.5,2.5h13c1.378,0,2.5-1.121,2.5-2.5V5.5Z" />
                        </svg>
                        <svg @click="() => {
                            opened3 = false;
                            opened2 = false;
                            opened = true
                        }" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                            id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;"
                            xml:space="preserve" width="512" height="512">
                            <g>
                                <path
                                    d="M490.667,96c0-17.673-14.327-32-32-32h-80.555C364.632,25.757,328.549,0.13,288,0h-64   c-40.549,0.13-76.632,25.757-90.112,64H53.333c-17.673,0-32,14.327-32,32l0,0c0,17.673,14.327,32,32,32H64v266.667   C64,459.468,116.532,512,181.333,512h149.333C395.468,512,448,459.468,448,394.667V128h10.667   C476.34,128,490.667,113.673,490.667,96z M384,394.667C384,424.122,360.122,448,330.667,448H181.333   C151.878,448,128,424.122,128,394.667V128h256V394.667z" />
                                <path
                                    d="M202.667,384c17.673,0,32-14.327,32-32V224c0-17.673-14.327-32-32-32s-32,14.327-32,32v128   C170.667,369.673,184.994,384,202.667,384z" />
                                <path
                                    d="M309.333,384c17.673,0,32-14.327,32-32V224c0-17.673-14.327-32-32-32s-32,14.327-32,32v128   C277.333,369.673,291.66,384,309.333,384z" />
                            </g>
                        </svg>
                        <svg @click="() => hashtagWindow = !hashtagWindow" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px"
                            version="1.1" id="Capa_1" viewBox="0 0 490 490" xml:space="preserve">
                            <path
                                d="M64.333,490h58.401l33.878-137.69h122.259L245.39,490h58.401l33.878-137.69h119.92v-48.162h-108.24l29.2-117.324h79.04  v-48.162H390.23L424.108,0H365.31l-33.878,138.661H208.79L242.668,0h-58.415l-33.864,138.661H32.411v48.162h106.298l-28.818,117.324  h-77.48v48.162h65.8L64.333,490z M197.11,186.824h122.642l-29.2,117.324H168.292L197.11,186.824z" />
                        </svg>

                        <div v-if="opened" class="deleteWindow">
                            <h4>You sure you want to delete ?</h4>
                            <router-link to="/">
                                <button @click="deleteTask">yes</button>
                            </router-link>
                            <button @click="() => {
                                opened3 = false;
                                opened2 = false;
                                opened = false
                            }">cancel</button>
                        </div>
                    </div>
                    <router-link to="/">
                        <button @click="updateTask">save</button>
                    </router-link>
                </div>
            </div>
        </div>
        <div v-else class="loading"></div>
    </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

interface Extension {
    name: string,
    text: string
}

interface Task {
    _id: string;
    header: string;
    context: string;
    completed: boolean;
    taskNum: number;
    deadline: string;
    hashtag: string[];
    extensions: Extension[];
}

export default {
    name: 'singlePage',
    setup() {
        const route = useRoute()
        const taskId = route.params.id;
        const task = ref<Task>();
        const header = ref<string>();
        const context = ref<string>();
        const opened = ref<boolean>(false);
        const opened2 = ref<boolean>(false);
        const opened3 = ref<boolean>(false);
        const deadline = ref<Date>();
        const hashtagWindow = ref<boolean>(false);
        const hashtags = ref<string[]>([]);
        const hashtag = ref<string>('');
        const extensions = ref<Extension[]>([]);
        const extension = ref({ name: '', text: '' });
        const completed = ref<boolean>();
        const imageurl = ref<string>('')

        const getData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/getSingleTask', {
                    method: 'POST',
                    body: JSON.stringify({
                        id: taskId
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })

                const data = await response.json();

                task.value = data.task[0];
                header.value = data.task[0].header;
                context.value = data.task[0].context;
                hashtags.value = data.task[0].hashtags;
                extensions.value = data.task[0].extensions;
                completed.value = data.task[0].completed;
                imageurl.value = data.task[0].image_url;
                console.log(data.task[0].extensions);

            } catch (err) {
                console.log(err);
            }
        }

        const updateTask = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/updateTask', {
                    method: 'POST',
                    body: JSON.stringify({
                        header: header.value,
                        context: context.value,
                        deadline: deadline.value,
                        hashtags: hashtags.value,
                        extensions: extensions.value,
                        completed: completed.value,
                        image_url : imageurl.value,
                        id: taskId
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })

                const data = await response.json();
            } catch (err) {
                console.log(err);
            }
        }

        const deleteTask = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/deleteTask', {
                    method: 'POST',
                    body: JSON.stringify({
                        id: taskId
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })

                const data = await response.json();
            } catch (err) {
                console.log(err);
            }
        }

        const addHashtags = (e: Event) => {
            e.preventDefault();
            hashtags.value.push(hashtag.value);
            hashtag.value = ''
        }

        const deleteHashtag = (index: number) => {
            hashtags.value.splice(index, 1);
        }

        const addExtension = () => {
            extensions.value.push({ ...extension.value })
            extension.value.name = '';
            extension.value.text = '';
        }

        const checkTask = () => {
            completed.value = !completed.value
        }

        const handleFileUpload = (event: Event) => {
            const input = event.target as HTMLInputElement;
            if (!input.files) return;

            const file = input.files[0];
            if (!file) return;
            let reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
                imageurl.value = reader.result as string;
            }
        };

        onMounted(() => {
            getData();
        })

        const methods = {
            getData,
            updateTask,
            deleteTask,
            addHashtags,
            deleteHashtag,
            addExtension,
            checkTask,
            handleFileUpload
        }

        return {
            task,
            header,
            context,
            opened,
            opened2,
            opened3,
            deadline,
            hashtagWindow,
            hashtags,
            hashtag,
            extensions,
            extension,
            completed,
            imageurl,
            ...methods
        }
    }
}
</script>

<style lang="scss">
.deadlineWindow,
.extensionsWindow {
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgba(186, 186, 186, 0.6);
    backdrop-filter: blur(5px);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;

    form {
        width: 400px;
        height: 320px;
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        padding: 30px 0;

        input {
            width: 200px;
            height: 60px;
            font-size: 20px;
            text-align: center;
        }

        button {
            height: 40px;
            width: 80px;
            border: 3px var(--dark-blue) solid;
            background-color: white;
            border-radius: 10px;
            font-weight: 600;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            &:hover {
                background-color: var(--dark-blue);
                color: white;
            }

            &:active {
                transform: scale(0.96);
            }
        }
    }
}

.extensionsWindow {

    form {

        input {
            text-align: left;
            padding: 10px;
        }
    }
}

.singlePage {
    width: 100%;
    height: 100%;
    padding: 30px;
    background-color: rgba(0, 0, 0, 0.01);
    min-height: 100vh;

    .inside {
        position: relative;
        width: 100%;
        min-height: calc(100vh - 60px);
        box-shadow: var(--shadow);
        border: 1px rgba(0, 0, 0, 0.01) solid;
        border-radius: 30px;
        background-color: white;
        padding-bottom: 100px;

        .top {
            width: 100%;
            height: 80px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px #000a2d5f solid;
            padding: 20px;

            .left {
                display: flex;
                align-items: center;
                gap: 10px;

                svg {
                    width: 35px;
                    height: 35px;
                    fill: var(--dark-blue);
                }

                h1 {
                    color: var(--dark-blue);
                }

                p {
                    color: var(--dark-blue);
                }
            }

            .middle {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                p:nth-child(1) {
                    font-size: 18px;
                    font-weight: 500;
                    cursor: pointer;
                }
            }

            .right {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-right: 20px;

                .complete {
                    width: 30px;
                    height: 30px;
                    background: transparent;
                    border: 0;
                    outline: 0;
                    border-radius: 5px;
                    border: 1px var(--dark-blue) solid;

                    svg {
                        width: 25px;
                        height: 25px;
                        fill: var(--dark-blue);
                        cursor: pointer;
                    }
                }
            }

        }

        .bottom {
            padding: 20px;

            textarea {
                width: 100%;
                border: 0;

                &:focus {
                    border: 0;
                    outline: 0;
                }
            }

            .heading {
                textarea {
                    font-size: 40px;
                    height: 1.6em;
                    line-height: 1.6em;
                    overflow: hidden;
                    color: var(--dark-blue);
                }
            }

            .context {
                textarea {
                    font-size: 24px;
                    overflow: hidden;
                    margin-top: 10px;
                    color: var(--dark-blue);
                }
            }

            .extensions {
                display: flex;
                flex-direction: column;
                gap: 20px;
                margin-bottom: 100px;

                .extension {
                    width: 100%;
                    height: 80px;
                    border-bottom: 1px var(--dark-blue) solid;
                    border-top: 1px var(--dark-blue) solid;
                    display: flex;
                    flex-direction: column;
                    align-items: start;
                    justify-content: space-evenly;

                    .text {
                        font-size: 20px;
                    }
                }
            }

            .allhashtags {
                min-height: 100px;
                max-height: 150px;
                overflow-y: scroll;
                overflow-x: hidden;
                display: flex;
                flex-direction: column;
                gap: 15px;

                .single {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 5px 8px;
                    background-color: rgb(215, 215, 215);
                    width: fit-content;
                    border-radius: 100px;

                    svg {
                        width: 20px;
                        height: 20px;
                        cursor: pointer;
                    }
                }
            }

            .image {
                max-width: 100%;
            }

            .add {
                position: absolute;
                width: calc(100% - 40px);
                height: 60px;
                border-radius: 40px;
                box-shadow: var(--shadow);
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                padding: 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .buttons {
                    display: flex;
                    align-items: center;
                    gap: 20px;

                    .file-input-container {
                        position: relative;
                        display: inline-block;
                    }

                    .file-input-label {
                        display: inline-block;
                        position: relative;
                        cursor: pointer;
                    }

                    .file-input {
                        position: absolute;
                        top: 0;
                        left: 0;
                        opacity: 0;
                        width: 100%;
                        height: 100%;
                        cursor: pointer;
                    }

                    svg {
                        height: 30px;
                        width: 30px;
                        cursor: pointer;
                        fill: var(--dark-blue);
                    }

                    .deleteWindow {
                        display: flex;
                        align-items: center;
                        width: fit-content;
                        gap: 20px;
                        color: red;
                        // display: none;

                        button:nth-child(3) {
                            border: 2px red solid;
                            color: red;

                            &:hover {
                                background-color: transparent;
                            }
                        }

                        button:nth-child(2) {
                            color: white;
                            background-color: red;
                            border: red;
                        }
                    }
                }

                button {
                    height: 40px;
                    width: 80px;
                    border: 3px var(--dark-blue) solid;
                    background-color: white;
                    border-radius: 10px;
                    font-weight: 600;
                    font-size: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;

                    &:hover {
                        background-color: var(--dark-blue);
                        color: white;
                    }

                    &:active {
                        transform: scale(0.96);
                    }
                }
            }
        }
    }
}
</style>