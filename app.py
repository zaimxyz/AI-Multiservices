from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('dashboard.html')

@app.route('/transcribe')
def transcribe():
    return render_template('services/transcribe.html')

@app.route('/chat-with-pdf')
def chat_with_pdf():
    return render_template('services/chat-with-pdf.html')

@app.route('/generate-text')
def generate_text():
    return render_template('services/generate-text.html')

@app.route('/text-to-image')
def text_to_image():
    return render_template('services/text-to-image.html')

@app.route('/about-us')
def about_us():
    return render_template('about-us.html')

@app.route('/login')
def login():
    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True)