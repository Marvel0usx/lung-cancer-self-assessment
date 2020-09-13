document.addEventListener("DOMContentLoaded", init);

var homePage, chatPage;
var startBtn, textDisp, promptDisp, dropArea;

function init() {
    startBtn = document.querySelector("#enter-chat");
    homePage = document.querySelector("#home");
    chatPage = document.querySelector("#chat");
    textDisp = document.querySelector("#input");
    promptDisp = document.querySelector("#prompt");
    dropArea = document.querySelector("#drop-area");

    startBtn.addEventListener("click", () => {
        homePage.style.display = "none";
        chatPage.style.display = "block";
        updateQuestion();
        document.addEventListener("keydown", updateText);
    });
}

function updateText(evt) {
    if (evt.altKey || evt.shiftKey || evt.ctrlKey) {
        evt.preventDefault();
        evt.stopPropagation();
        return;
    }
    if (evt.keyCode == 13) {
        if (questionIdx >= questions.length) {
            document.removeEventListener("keydown", updateText, true);
            promptDisp.textContent = "Now we've gethered your information.\nPlease wait for a moment for your assessment.";
            setTimeout(() => {
                rf_analysis();
            }, 3000);
        } else {
            updateQuestion();
        }
        result.push(textDisp.textContent);
        textDisp.textContent = "";
    } else if (evt.keyCode == 8 || evt.keyCode == 46) {
        textDisp.textContent = textDisp.textContent.slice(0, -1);
    } else {
        textDisp.textContent += evt.key;        
    }
}

var questionIdx = 0;
var result = [];

var questions = [
    "Hi. What is your age?",
    "What is your gender?",
    "Is the place you live in has bad air quality?",
    "Do you use alcohol? Please tell me how often do you have it.",
    "Are you allergic to dust?",
    "Does your occupation require you to expose in toxic, harmful air?",
    "To what extent do you think your family is prone to this disease?",
    "Have you ever had chronic lung disease?",
    "What do you think about your diet?",
    "What is your height?",
    "What is your weight?",
    "How often do you smoke?",
    "Do people around you smoke?",
    "Do you have chest pain?",
    "Do you cough with blood?",
    "Do you feel tired?",
    "Any weight lose?",
    "Do you experience difficulty of breath?",
    "Wheezing when you breath?",
    "Do you experience swallowing difficulty?",
    "Do you have clubbing nails?",
    "How often do you catch a cold?",
    "Do you often dry cough?",
    "Snoring during sleep?"
];

function updateQuestion() {
    promptDisp.textContent = questions[questionIdx++];
}

function rf_analysis() {
    fetch("http://localhost:5000/analysis", 
        {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"data": result})
        }
    )
    .then(response => response.json())
    .then(data => {
        promptDisp.textContent = "Our prediction shows that you have " + data.rf_prediction + " potential to get lung cancer.";
        setTimeout(() => {
            promptDisp.textContent = "Upload your CT scan to get a better prediction.";
            dropArea.style.display = "block";
            wait4ImageUpload();
        }, 6000);
    });
}

function wait4ImageUpload() {
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ;['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    // Handle dropped files
    dropArea.addEventListener('drop', handleDrop, false);

    function preventDefaults (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(e) {
        dropArea.classList.add('highlight');
    }

    function unhighlight(e) {
        dropArea.classList.remove('active');
    }

    function handleDrop(e) {
        var dt = e.dataTransfer;
        var files = dt.files;

        handleFiles(files);
    }

    let uploadProgress = [];
    let progressBar = document.getElementById('progress-bar');

    function initializeProgress(numFiles) {
        progressBar.value = 0;
        uploadProgress = [];

        for(let i = numFiles; i > 0; i--) {
            uploadProgress.push(0);
        }
    }

    function updateProgress(fileNumber, percent) {
        uploadProgress[fileNumber] = percent;
        let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length;
        console.debug('update', fileNumber, percent, total);
        progressBar.value = total;
    }

    function handleFiles(files) {
        files = [...files];
        initializeProgress(files.length);
        files.forEach(uploadFile);
        files.forEach(previewFile);
    }

    function previewFile(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            let img = document.createElement('img');
            img.src = reader.result;
            document.getElementById('gallery').appendChild(img);
        }
    }

    function uploadFile(file, i) {
        var url = "http://localhost:5000/image-analysis";
        var xhr = new XMLHttpRequest();
        var formData = new FormData();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        // Update progress (can be used to show progress indicator)
        xhr.upload.addEventListener("progress", function(e) {
            updateProgress(i, (e.loaded * 100.0 / e.total) || 100);
        });

        xhr.addEventListener('readystatechange', function(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                updateProgress(i, 100); // <- Add this
                // receive response on state change
                dispCNNAnalysis(JSON.parse(this.responseText));
            }
            else if (xhr.readyState == 4 && xhr.status != 200) {
                alert("error: fail to upload image");
            }
        });

        formData.append('upload_preset', 'ujpu6gyk');
        formData.append('file', file);
        xhr.send(formData);
    }
}

function dispCNNAnalysis(res) {
    // promptDisp.style.fontSize = "10px";
    // promptDisp.innerHTML = ;
    alert("We have your CT scan undergone our CNN neural network; and the result shows that" + 
                            "you have <span style='color: red;'>" + res.cancer + "%</span> chance of having cancer, " +
                            "and <span style='color: blue;'>" + res.no_cancer + "%</span> of not having cancer.");
}