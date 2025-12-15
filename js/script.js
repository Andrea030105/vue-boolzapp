const {
    createApp
} = Vue;

const dt = luxon.DateTime;

createApp({
    data() {
        return {
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: '_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: '_7',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: '_8',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ],

            chatActive: 0,
            newMexInput: '',
            searchChatInput: '',
            openMenuIndex: null,
        }
    },
    computed: {
        searchChat() {
            const query = this.searchChatInput.toLowerCase().trim();

            if (query !== '') {
                return this.contacts.filter(elem =>
                    elem.name.toLowerCase().includes(query)
                );
            } else {
                return this.contacts;
            }
        }
    },
    methods: {
        showMexChat(contact) {
            this.chatActive = this.contacts.findIndex(c => c.avatar === contact.avatar);
        },
        newMex() {
            let object = {
                date: this.nowTime(),
                message: this.newMexInput,
                status: 'sent',
            };
            this.contacts[this.chatActive].messages.push(object);
            this.newMexInput = '';

            setTimeout(this.answereNewMex, 1000)
        },
        answereNewMex() {
            let object = {
                date: this.nowTime(),
                message: 'ok',
                status: 'received',
            };
            this.contacts[this.chatActive].messages.push(object);
        },
        nowTime() {
            let currentTime = dt.now().setLocale('it').toLocaleString(dt.TIME_24_SIMPLE);
            return currentTime;
        },
        convertDate() {
            const dataCompletaArray = [];
            const soloOraArray = [];
            for (let i = 0; i <= this.contacts.length - 1; i++) {
                /* recupoero e pusho le date di tutti gli ultimi messaggi della chat */
                dataCompletaArray.push(this.contacts[i].messages[this.contacts[i].messages.length - 1].date);
                if (this.contacts[i].messages[this.contacts[i].messages.length - 1].date.length == 19) {
                    /* converto il formato data in data luxon */
                    dataCompletaArray[i] = luxon.DateTime.fromFormat(dataCompletaArray[i], 'dd/MM/yyyy HH:mm:ss');
                    /* converto la data in ore e minuti */
                    let soloOra = dataCompletaArray[i].toFormat('HH:mm');
                    /* pusho tutto in un nuovo arrey */
                    soloOraArray.push(soloOra);
                } else {
                    let soloOra = this.contacts[this.chatActive].messages[this.contacts[this.chatActive].messages.length - 1].date;
                    soloOraArray.push(soloOra);
                }
            }
            return soloOraArray[this.chatActive];
        },
        showBoxDeleteMex(index) {
            this.openMenuIndex = this.openMenuIndex === index ? null : index;
        },
        deleteMex(index) {
            if (index >= 0 && index < this.contacts[this.chatActive].messages.length) {
                this.contacts[this.chatActive].messages.splice(index, 1);
                this.openMenuIndex = null;
                if (this.contacts[this.chatActive].messages.length === 0) {
                    this.contacts.splice(index, 1);
                    this.openMenuIndex = null;
                    console.log(this.contacts.length);

                }
            }
        },
        lastMexList(index) {
            return this.contacts[index].messages[this.contacts[index].messages.length - 1].message.slice(0, 20) + '...';
        }
    }
}).mount("#app")