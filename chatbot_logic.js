// Enhanced Medication Reminder System
class MedicationReminder {
    constructor() {
        this.medicationTimes = [8, 20]; // 8AM and 8PM
        this.pendingConfirmation = false;
        this.reminderInterval = null;
        this.userMoodResponses = {
            happy: ["🌟 Wonderful! Let's keep that smile!", "😊 Your positivity is contagious!"],
            neutral: ["👍 Got it!", "Alright then!"],
            sad: ["💙 I'm here for you", "🤗 Sending you virtual hugs"]
        };
    }

    checkMedicationTime() {
        const now = new Date();
        const currentHour = now.getHours();
        if (this.medicationTimes.includes(currentHour) && !this.pendingConfirmation) {
            this.startReminderProtocol();
        }
    }

    startReminderProtocol() {
        this.pendingConfirmation = true;
        const funReminders = [
            "⏰ Pssst... TB stands for 'Take Bravely'! Time for your meds!",
            "💊 Your daily health boost is waiting! Type 'done' when taken!",
            "🌟 Superhero alert! Your medicine needs you!"
        ];
        this.sendMessage(funReminders[Math.floor(Math.random() * funReminders.length)]);
        
        this.reminderInterval = setInterval(() => {
            if (this.pendingConfirmation) {
                const followUps = [
                    "👋 Just checking in - have you taken your meds?",
                    "💭 Remember: Meds today = Health tomorrow! Taken them yet?",
                    "⏳ Tick-tock! Your meds are getting lonely!"
                ];
                this.sendMessage(followUps[Math.floor(Math.random() * followUps.length)]);
            }
        }, 3600000); // 1 hour
    }

    confirmMedication() {
        this.pendingConfirmation = false;
        clearInterval(this.reminderInterval);
        const confirmations = [
            "✅ You're a medication superstar! 🌟",
            "💪 Boom! Another dose conquered!",
            "🥳 Celebration time! You're sticking to your treatment!"
        ];
        this.sendMessage(confirmations[Math.floor(Math.random() * confirmations.length)]);
    }

    sendMessage(text) {
        // Implementation in TBChatbot class
    }
}

// Enhanced TB Knowledge Base
class TBKnowledgeBase {
    constructor() {
        this.info = {
            causes: `🦠 *TB Causes:*\n\nSpread through air when infected people cough/sneeze\n\n🔬 Bacteria: Mycobacterium tuberculosis\n\n💡 Did you know? TB is one of humanity's oldest diseases!`,
            symptoms: `🤒 *TB Symptoms:*\n\n• 3+ week cough\n• Chest pain\n• Coughing blood\n• Fatigue\n• Fever/chills\n• Night sweats\n• Weight loss\n\n⚠️ If experiencing these, see a doctor!`,
            treatment: `💊 *TB Treatment:*\n\n• 6-9 months of antibiotics\n• Common meds: Isoniazid, Rifampin\n• NEVER stop early!\n\n🌟 Pro Tip: Pair meds with a daily routine (like breakfast)`,
            precautions: `🛡️ *TB Prevention:*\n\n• Cover coughs/sneezes\n• Ventilate rooms\n• Complete treatment\n• Healthy diet 🥗\n• Good sleep 😴\n\nRemember: You're protecting others too!`,
            doctors: {
                "Delhi": ["👨‍⚕️ Dr. Sharma (AIIMS) - 9876543210", "👩‍⚕️ Dr. Kapoor (Safdarjung) - 8765432109"],
                "Mumbai": ["👨‍⚕️ Dr. Patel (Hinduja) - 7654321098"]
            }
        };
    }

    getInfo(topic) {
        return this.info[topic] || "I can explain:\n• Causes 🦠\n• Symptoms 🤒\n• Treatment 💊\n• Precautions 🛡️\n• Doctors 👩‍⚕️";
    }
}

// Interactive Chatbot Core
class TBChatbot {
    constructor() {
        console.log("Initializing TB Care Assistant...");
        
        // Initialize components
        this.reminderSystem = new MedicationReminder();
        this.knowledgeBase = new TBKnowledgeBase();
        
        // Get DOM elements
        this.chatWindow = document.getElementById('chatWindow');
        this.userInput = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendButton');
        
        // Verify elements exist
        if (!this.chatWindow || !this.userInput || !this.sendButton) {
            console.error("Error: Missing required HTML elements!");
            return;
        }
        
        // Bind sendMessage to reminder system
        this.reminderSystem.sendMessage = this.addBotMessage.bind(this);
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Start chat
        this.initializeChat();
        
        // Start medication reminders
        setInterval(() => this.reminderSystem.checkMedicationTime(), 60000);
        
        console.log("TB Care Assistant ready!");
    }

    initializeChat() {
        const welcomeMessages = [
            `👋 Hello Health Hero! 🌟\nI'm your TB Care Buddy!\n\nI can:\n1. Remind you about meds 💊\n2. Share TB info 🧠\n3. Find doctors 👩‍⚕️\n\nHow can I help?`,
            `🙏 Namaste Warrior! 💪\nI'm here to support your TB journey!\n\nAsk me about:\n• Medications ⏰\n• TB facts 🦠\n• Doctor contacts 🏥`, 
            `🌟 Welcome Champion! 🏆\nReady to tackle TB together?\n\nI can help with:\n- Treatment reminders\n- Health information\n- Medical support`
        ];
        
        // Get or initialize message index
        let messageIndex = sessionStorage.getItem('welcomeMsgIndex');
        if (messageIndex === null) {
            messageIndex = 0;
        } else {
            messageIndex = parseInt(messageIndex);
            messageIndex = (messageIndex + 1) % welcomeMessages.length;
        }
        
        // Store the next index
        sessionStorage.setItem('welcomeMsgIndex', messageIndex);
        
        // Clear chat before showing new message
        this.chatWindow.innerHTML = '';
        
        // Display only the selected message
        this.addBotMessage(welcomeMessages[messageIndex]);
    }

    handleUserInput(message) {
        const lowerMsg = message.toLowerCase().trim();
        
        // 1. Handle greetings
        if (/(hello|hi|hey|namaste|Bonjour)/i.test(lowerMsg)) {
            const responses = [
                `👋 Hello there! How are you feeling today?\n\nFirst things first - did you take your meds today?`,
                `🌟 Hey champ! 😊 How's your day going?\n\nQuick check - meds taken?`,
                `🙏 Namaste friend! 🌸 Before we chat... medicine taken today?`
            ];
            this.addBotMessage(responses[Math.floor(Math.random() * responses.length)]);
            return;
        }
        
        // 2. Handle medication responses
        if (/(yes|done|took|taken|yeah|haa|obviously)/i.test(lowerMsg)) {
            this.reminderSystem.confirmMedication();
            this.addBotMessage("🌟 Now, what else can I help you with?");
            return;
        }
        
        if (/(no|not yet|naah|nahi|man nahi hai| nahi liya|sorry)/i.test(lowerMsg)) {
            const funResponses = [
                "😏 Playing hard to get with your meds, eh? How about we make a deal - take them now and I'll tell you a health joke!",
                "👀 My sensors detect... MEDICATION NOT TAKEN! Let's fix this, superhero! 🦸‍♀️",
                "⏰ Time to be your own hero! Your meds are waiting to be conquered!"
            ];
            this.addBotMessage(funResponses[Math.floor(Math.random() * funResponses.length)]);
            return;
        }
        
        // 3. Handle information requests
        if (/(what|how|why|info|information|tell me|know)/i.test(lowerMsg)) {
            const topic = this.extractTopic(lowerMsg);
            const info = this.knowledgeBase.getInfo(topic);
            this.addBotMessage(info);
            return;
        }
        
        // 4. Handle doctor requests
        if (/(doctor|specialist|hospital|clinic)/i.test(lowerMsg)) {
            const location = this.extractLocation(lowerMsg) || "Delhi";
            const doctors = this.knowledgeBase.info.doctors[location] || this.knowledgeBase.info.doctors["Delhi"];
            this.addBotMessage(`🩺 TB Specialists in ${location}:\n\n${doctors.join("\n")}\n\nStay healthy! 💖`);
            return;
        }
        
        // 5. Handle fun interactions
        if (/(joke|fun|bored|health joke|jokes)/i.test(lowerMsg)) {
            const jokes = [
                "Why did the bacteria break up with the virus?\nBecause it was a toxic relationship! 😂",
                "What did the doctor say to the bacteria?\n'You're under a rest!' 🛌",
                "Why was the microbiologist great at poker?\nThey knew when to culture their wins! 🃏"
            ];
            this.addBotMessage(jokes[Math.floor(Math.random() * jokes.length)]);
            return;
        }
        
        // Default response
        const fallbacks = [
            "I'm your TB buddy! Ask me about:\n• Medications 💊\n• TB facts 🦠\n• Doctors 👩‍⚕️",
            "Let's focus on your health! I can help with:\n- Treatment reminders\n- Medical info\n- Doctor contacts",
            "Health first! Try asking:\n'Tell me about TB symptoms'\nor\n'Find me a doctor in Delhi'"
        ];
        this.addBotMessage(fallbacks[Math.floor(Math.random() * fallbacks.length)]);
    }

    // Helper methods
    extractTopic(message) {
        if (/cause/.test(message)) return "causes";
        if (/symptom|sign/.test(message)) return "symptoms";
        if (/treat|medic|cure/.test(message)) return "treatment";
        if (/prevent|stop|avoid/.test(message)) return "precautions";
        return null;
    }

    extractLocation(message) {
        if (/delhi|ncr/.test(message)) return "Delhi";
        if (/mumbai|bombay/.test(message)) return "Mumbai";
        return null;
    }

    setupEventListeners() {
        // Click event for send button
        this.sendButton.addEventListener('click', () => {
            const message = this.userInput.value.trim();
            if (message) {
                this.addUserMessage(message);
                this.handleUserInput(message);
                this.userInput.value = '';
            }
        });
        
        // Enter key support
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const message = this.userInput.value.trim();
                if (message) {
                    this.addUserMessage(message);
                    this.handleUserInput(message);
                    this.userInput.value = '';
                }
            }
        });
    }

    addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.textContent = text;
        this.chatWindow.appendChild(messageDiv);
        this.chatWindow.scrollTop = this.chatWindow.scrollHeight;
    }

    addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.textContent = text;
        this.chatWindow.appendChild(messageDiv);
        this.chatWindow.scrollTop = this.chatWindow.scrollHeight;
    }
}

// Initialize when page loads
window.addEventListener('load', () => {
    console.log("Page fully loaded - starting chatbot");
    new TBChatbot();
});