document.addEventListener('DOMContentLoaded', () => {
    const introductionSection = document.getElementById('introduction');
    const quizQuestionsSection = document.getElementById('quiz-questions');
    const quizResultSection = document.getElementById('quiz-result');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const questionArea = document.getElementById('question-area');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitQuizBtn = document.getElementById('submit-quiz-btn');
    const retakeQuizBtn = document.getElementById('retake-quiz-btn');

    let currentQuestionIndex = 0;
    let userAnswers = new Array(15).fill(null); // Array to store answers for 15 questions

    // Result profiles
    const descriptions = {
        "Kuromi × Cinnamoroll": {
            "description": "Teasing but soft — like a roast wrapped in a hug",
            "letter": "Dear trouble magnet,\n\nYou ruin my peace and I thank you for it daily. Every sarcastic remark, every playful jab, it's all just another way I show you how much I adore you. You're the chaos to my calm, the mischief to my sweet, and honestly, I wouldn't have it any other way. Even when I pretend to be annoyed, know that I'm secretly smiling because you're just so undeniably *you*. Thanks for being the only one who can get under my skin and still make my heart race. Love you, even if I don't always say it with hearts and rainbows.\n\n~ Your favorite"
        },
        "My Melody × Hello Kitty": {
            "description": "Sentimental softies — you're both gentle, grounded, and warm",
            "letter": "Sweetheart,\n\nYou're the sunshine behind every cloud in my sky. Being with you feels like a warm, comforting hug that I never want to end. Your gentle spirit and kind heart make every moment brighter, and I cherish all the quiet, simple joys we share. Thank you for being my safe space, my confidant, and my dearest friend. My world is so much softer and more beautiful with you in it. I love you more than words can say.\n\n~ Your forever friend"
        },
        "Gudetama × Pompompurin": {
            "description": "Cozy & sleepy — love that feels like warm soup",
            "letter": "Hey sleepyhead,\n\nI was lying down doing nothing and thought of you, which is pretty much my favorite thing to do. Our love is like the perfect lazy Sunday afternoon – warm, comforting, and utterly effortless. You're my favorite blanket, my go-to snack, and the only person I'd willingly share my naptime with. Thanks for making doing nothing feel like everything. You're the best kind of cozy. See you in my dreams (or on the couch).\n\n~ Your comfy companion"
        },
        "Chococat × Badtz-Maru": {
            "description": "Brains meet chaos — sarcastic & sweet under the surface",
            "letter": "To my favorite glitch in the matrix,\n\nYou confuse me and I adore it. Our conversations are a wild ride, a perfect blend of witty banter, unexpected tangents, and just enough sarcasm to keep things interesting. Beneath that cool, sometimes chaotic exterior, I know there's a heart of gold (and probably a secret stash of memes). You challenge me, make me laugh until my sides hurt, and understand my weirdness like no one else. I hope you think of me when you read this. I hope you think of me when you're laughing, and when you're scrolling on your phone late at night. I hope you remember me when you're making your coffee and when you're listening to music. I hope you think of me always.\n\nLove you, loser. \n\n~ Your Favorite Headache"
        },
        "Keroppi × Little Twin Stars": {
            "description": "Dreamy, magical, and long-distance sweet",
            "letter": "Dear starlight,\n\nSome nights the moon feels closer than you, but even across the miles, our connection shines brighter than any constellation. You're my magical adventure, my whimsical dream, and every video call feels like we're sharing the same starry sky. Though physical distance may separate us, our hearts are always intertwined, sending wishes and dreams back and forth. Thank you for making every moment feel enchanting, no matter how far apart we are. Can't wait until our next cosmic reunion.\n\n~ Your distant dream weaver"
        }
    };

    // Expanded score map
    const score_map = {
        1: {
            "Hi, its me again. Still obsessed with you.": "My Melody × Hello Kitty",
            "So I wasn't going to write this but then I thought of your stupid face.": "Kuromi × Cinnamoroll",
            "To the warmest part of my day, even from miles away...": "Keroppi × Little Twin Stars",
            "Dear love, if this makes you cry, its your fault.": "Chococat × Badtz-Maru"
        },
        2: {
            "I still cant believe you chose me.": "My Melody × Hello Kitty",
            "Even when were apart, I feel you in everything.": "Keroppi × Little Twin Stars",
            "You're my calm in chaos, my hoodie in winter.": "Gudetama × Pompompurin",
            "I miss you so much it makes me stupid.": "Kuromi × Cinnamoroll"
        },
        3: {
            "A selfie holding their hoodie": "Gudetama × Pompompurin",
            "A handwritten poem and pressed flower": "My Melody × Hello Kitty",
            "A page of dumb doodles you made while missing them": "Chococat × Badtz-Maru",
            "A Spotify playlist of your moods": "Keroppi × Little Twin Stars",
            "A coupon for 1 forehead kiss (redeemable IRL)": "Kuromi × Cinnamoroll"
        },
        4: {
            "Soft and poetic, like a Cinnamoroll cloud": "My Melody × Hello Kitty",
            "Teasing but sincere, like a Kuromi roast": "Kuromi × Cinnamoroll",
            "Straight-up emotional My Melody crying emoji": "Gudetama × Pompompurin",
            "Casual but deep: Gudetama with a heart": "Keroppi × Little Twin Stars"
        },
        5: {
            "I love you more than sleep, and thats saying a lot.": "My Melody × Hello Kitty",
            "Dont read this and ghost me text me back, idiot.": "Kuromi × Cinnamoroll",
            "Youre my peace, my favorite hoodie, my home.": "Gudetama × Pompompurin",
            "I hope this letter makes you feel held.": "Keroppi × Little Twin Stars",
            "P.S. Im sorry if I cried while writing this.": "Chococat × Badtz-Maru"
        },
        6: {
            "Kuromi": "Kuromi × Cinnamoroll",
            "Cinnamoroll": "Kuromi × Cinnamoroll",
            "My Melody": "My Melody × Hello Kitty",
            "Badtz-Maru": "Chococat × Badtz-Maru",
            "Pompompurin": "Gudetama × Pompompurin",
            "Chococat": "Chococat × Badtz-Maru"
        },
        7: {
            "Kuromi x Cinnamoroll": "Kuromi × Cinnamoroll",
            "My Melody x Hello Kitty": "My Melody × Hello Kitty",
            "Gudetama x Pompompurin": "Gudetama × Pompompurin",
            "Chococat x Badtz-Maru": "Chococat × Badtz-Maru",
            "Keroppi x Little Twin Stars": "Keroppi × Little Twin Stars"
        },
        8: {
            "Goth-cute": "Kuromi × Cinnamoroll",
            "Pastel skies + sleepy cafe dates": "My Melody × Hello Kitty",
            "Strawberry milk & journaling": "Keroppi × Little Twin Stars",
            "Smart + stylish chaos": "Chococat × Badtz-Maru",
            "Oversized hoodies & naps": "Gudetama × Pompompurin"
        },
        9: {
            "A scrapbook full of notes and doodles": "My Melody × Hello Kitty",
            "A handwritten letter with snacks": "Gudetama × Pompompurin",
            "A chaotic surprise box": "Chococat × Badtz-Maru",
            "A digital collage with voice note": "Keroppi × Little Twin Stars",
            "A Hello Kitty toaster": "Kuromi × Cinnamoroll"
        },
        10: {
            "Physical touch": "Kuromi × Cinnamoroll",
            "Words of affirmation": "My Melody × Hello Kitty",
            "Quality time": "Keroppi × Little Twin Stars",
            "Acts of service": "Gudetama × Pompompurin",
            "Teasing + meme spam": "Chococat × Badtz-Maru"
        },
        11: {
            "Spam them everywhere": "Kuromi × Cinnamoroll",
            "Text 'I deserve this'": "My Melody × Hello Kitty",
            "Send a Sanrio sticker": "Keroppi × Little Twin Stars",
            "Call their friend": "Gudetama × Pompompurin",
            "Write a 3-paragraph apology": "Chococat × Badtz-Maru"
        },
        12: {
            "'Ok??? That was my heart in a box???'": "Kuromi × Cinnamoroll",
            "'Delivered: disappointment'": "Chococat × Badtz-Maru",
            "- Say nothing. Sob.": "My Melody × Hello Kitty",
            "Plan a glitter bomb": "Keroppi × Little Twin Stars"
        },
        13: {
            "Tackle hug, cry": "My Melody × Hello Kitty",
            "'You look weird in 3D'": "Chococat × Badtz-Maru",
            "Whisper 'never letting go'": "Gudetama × Pompompurin",
            "Rant about the trip": "Keroppi × Little Twin Stars"
        },
        14: {
            "You fall asleep mid-call and snore. What now(?): ": "Chococat × Badtz-Maru", 
            "They record it": "Chococat × Badtz-Maru",
            "Blame a ghost": "Kuromi × Cinnamoroll",
            "They fall asleep too": "Gudetama × Pompompurin",
            "You do it on purpose next time": "Keroppi × Little Twin Stars"
        },
        15: {
            "They say 'I feel distant.' What do you do?": "My Melody × Hello Kitty",
            "Write a letter on the spot": "My Melody × Hello Kitty",
            "Schedule calls": "Keroppi × Little Twin Stars",
            "Get defensive, then melt": "Kuromi × Cinnamoroll",
            "Send a voice note": "Chococat × Badtz-Maru"
        }
    };

    // Questions array, matching the structure required for display
    const questions = [
        {
            question: "When you miss your partner, your first thought is:",
            options: [
                "Hi, its me again. Still obsessed with you.",
                "So I wasn't going to write this but then I thought of your stupid face.",
                "To the warmest part of my day, even from miles away...",
                "Dear love, if this makes you cry, its your fault."
            ]
        },
        {
            question: "The sentiment that best describes your relationship is:",
            options: [
                "I still cant believe you chose me.",
                "Even when were apart, I feel you in everything.",
                "You're my calm in chaos, my hoodie in winter.",
                "I miss you so much it makes me stupid."
            ]
        },
        {
            question: "Your ideal gift for them is:",
            options: [
                "A selfie holding their hoodie",
                "A handwritten poem and pressed flower",
                "A page of dumb doodles you made while missing them",
                "A Spotify playlist of your moods",
                "A coupon for 1 forehead kiss (redeemable IRL)"
            ]
        },
        {
            question: "How would you describe your partner's 'vibe'?",
            options: [
                "Soft and poetic, like a Cinnamoroll cloud",
                "Teasing but sincere, like a Kuromi roast",
                "Straight-up emotional My Melody crying emoji",
                "Casual but deep: Gudetama with a heart"
            ]
        },
        {
            question: "A true 'us' message would be:",
            options: [
                "I love you more than sleep, and thats saying a lot.",
                "Dont read this and ghost me text me back, idiot.",
                "Youre my peace, my favorite hoodie, my home.",
                "I hope this letter makes you feel held.",
                "P.S. Im sorry if I cried while writing this."
            ]
        },
        {
            question: "Which Sanrio character most embodies *you*?",
            options: [
                "Kuromi",
                "Cinnamoroll",
                "My Melody",
                "Badtz-Maru",
                "Pompompurin",
                "Chococat"
            ]
        },
        {
            question: "Which pairing best describes your relationship *today*?",
            options: [
                "Kuromi x Cinnamoroll",
                "My Melody x Hello Kitty",
                "Gudetama x Pompompurin",
                "Chococat x Badtz-Maru",
                "Keroppi x Little Twin Stars"
            ]
        },
        {
            question: "If your relationship had a Sanrio aesthetic, itd be...",
            options: [
                "Goth-cute",
                "Pastel skies + sleepy cafe dates",
                "Strawberry milk & journaling",
                "Smart + stylish chaos",
                "Oversized hoodies & naps"
            ]
        },
        {
            question: "What gift would your Sanrio self give them?",
            options: [
                "A scrapbook full of notes and doodles",
                "A handwritten letter with snacks",
                "A chaotic surprise box",
                "A digital collage with voice note",
                "A Hello Kitty toaster"
            ]
        },
        {
            question: "What does your Sanrio love language look like?",
            options: [
                "Physical touch",
                "Words of affirmation",
                "Quality time",
                "Acts of service",
                "Teasing + meme spam"
            ]
        },
        {
            question: "Partner blocks you as a joke. What now?",
            options: [
                "Spam them everywhere",
                "Text 'I deserve this'",
                "Send a Sanrio sticker",
                "Call their friend",
                "Write a 3-paragraph apology"
            ]
        },
        {
            question: "They reply ok to a gift. What now?",
            options: [
                "'Ok??? That was my heart in a box???'",
                "'Delivered: disappointment'",
                "- Say nothing. Sob.",
                "Plan a glitter bomb"
            ]
        },
        {
            question: "You finally meet what happens first?",
            options: [
                "Tackle hug, cry",
                "'You look weird in 3D'",
                "Whisper 'never letting go'",
                "Rant about the trip"
            ]
        },
        {
            question: "You fall asleep mid-call and snore. What now?",
            options: [
                "They record it",
                "Blame a ghost",
                "They fall asleep too",
                "You do it on purpose next time"
            ]
        },
        {
            question: "They say 'I feel distant.' What do you do?",
            options: [
                "Write a letter on the spot",
                "Schedule calls",
                "Get defensive, then melt",
                "Send a voice note"
            ]
        }
    ];

    // Mappings for result images (you'll need these image files in your 'images' folder)
    const resultImages = {
        "Kuromi × Cinnamoroll": "images/kuromi_cinnamoroll_result.jpg",
        "My Melody × Hello Kitty": "images/mymelody_hellokitty_result.jpg",
        "Gudetama × Pompompurin": "images/gudetama_pompompurin_result.jpg",
        "Chococat × Badtz-Maru": "images/chococat_badtzmaru_result.jpg",
        "Keroppi × Little Twin Stars": "images/keroppi_littletwinstars_result.jpg"
    };

    // Evaluation logic
    function evaluate(answers) {
        const scores = {};
        for (const key in descriptions) {
            scores[key] = 0;
        }

        answers.forEach((answer, index) => {
            const q_num = index + 1; // Question numbers are 1-based
            const question_options = score_map[q_num];
            if (question_options) {
                const result_type = question_options[answer];
                if (result_type) {
                    scores[result_type]++;
                }
            }
        });

        let topResult = '';
        let maxScore = -1;
        for (const key in scores) {
            if (scores[key] > maxScore) {
                maxScore = scores[key];
                topResult = key;
            }
        }
        // Simple tie-breaking: selects the first pairing encountered with the max score.

        return {
            "pairing": topResult,
            "description": descriptions[topResult]["description"],
            "love_letter": descriptions[topResult]["letter"]
        };
    }

    startQuizBtn.addEventListener('click', () => {
        introductionSection.classList.add('hidden');
        quizQuestionsSection.classList.remove('hidden');
        loadQuestion(currentQuestionIndex);
    });

    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (userAnswers[currentQuestionIndex] === null) {
            alert('Please select an answer before proceeding!');
            return;
        }
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
        }
    });

    // Handle answer selection
    questionArea.addEventListener('change', (event) => {
        if (event.target.type === 'radio' && event.target.name === 'answer') {
            userAnswers[currentQuestionIndex] = event.target.value;
            // console.log(`Question ${currentQuestionIndex + 1} answered: ${userAnswers[currentQuestionIndex]}`);
        }
    });

    submitQuizBtn.addEventListener('click', () => {
        // Final check for the last question
        if (userAnswers[currentQuestionIndex] === null) {
            alert('Please select an answer for the last question!');
            return;
        }

        // Check if all questions are answered
        const allAnswered = userAnswers.every(answer => answer !== null);
        if (!allAnswered) {
            alert('Please answer all questions before submitting!');
            return;
        }

        // Directly evaluate the answers using the local JS function
        const result = evaluate(userAnswers);
        displayResult(result);
    });

    retakeQuizBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        userAnswers.fill(null); // Reset answers
        quizResultSection.classList.add('hidden');
        introductionSection.classList.remove('hidden');
        prevBtn.disabled = true; // Reset button states
        submitQuizBtn.classList.add('hidden');
        nextBtn.classList.remove('hidden');
    });

    function loadQuestion(index) {
        const q = questions[index];
        if (!q) return; // Should not happen with proper indexing

        questionArea.innerHTML = `
            <p>Question ${index + 1} of ${questions.length}</p>
            <h2>${q.question}</h2>
            <div class="answer-options">
                ${q.options.map((option, i) => `
                    <div class="answer-option">
                        <input type="radio" id="q${index}-option${i}" name="answer" value="${option}"
                               ${userAnswers[index] === option ? 'checked' : ''}>
                        <label for="q${index}-option${i}">${option}</label>
                    </div>
                `).join('')}
            </div>
        `;

        // Update navigation buttons
        prevBtn.disabled = index === 0;
        if (index === questions.length - 1) {
            nextBtn.classList.add('hidden');
            submitQuizBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            submitQuizBtn.classList.add('hidden');
        }
    }

    function displayResult(result) {
        quizQuestionsSection.classList.add('hidden');
        quizResultSection.classList.remove('hidden');

        document.getElementById('result-pairing').textContent = result.pairing;
        document.getElementById('result-description').textContent = result.description;
        document.getElementById('result-love-letter').textContent = result.love_letter;

        // Set the appropriate image based on the pairing
        const imagePath = resultImages[result.pairing];
        const resultImage = document.getElementById('result-image');
        // Remove any previous 'no-image-message' if present
        const prevNoImageMsg = document.getElementById('no-image-message');
        if (prevNoImageMsg) prevNoImageMsg.remove();
        if (imagePath) {
            resultImage.src = imagePath;
            resultImage.alt = result.pairing;
        } else {
            // Fallback image if no specific image is found
            resultImage.src = "images/default_sanrio.jpg";
            resultImage.alt = "No image found for this pairing.";
            // Show a message below the image
            const noImageMsg = document.createElement('p');
            noImageMsg.id = 'no-image-message';
            noImageMsg.textContent = 'No image found , Sorry 😭😭';
            noImageMsg.style.color = '#e57373';
            noImageMsg.style.fontWeight = 'bold';
            resultImage.parentNode.insertBefore(noImageMsg, resultImage.nextSibling);
        }
    }

    // Initialize the introduction view
    introductionSection.classList.remove('hidden');
    quizQuestionsSection.classList.add('hidden');
    quizResultSection.classList.add('hidden');
});
