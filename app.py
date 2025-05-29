from flask import Flask, render_template, url_for, request, redirect, flash

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'  # Required for flash messages

# Home and Dictionary Routes
@app.route('/')
@app.route('/home')
def home():
    return render_template('menu.html', title="Home")

@app.route('/dictionary')
def dictionary():
    return render_template('dictionary.html', title="Dictionary")

# Validation Logic for Tests
def validate_test(questions, answers, template, title):
    if request.method == "POST":
        score = 0
        user_answers = []

        for i, correct_answer in enumerate(answers, 1):
            user_input = request.form.get(f'question-{i}', '').lower().strip("!?., ")
            user_answers.append(user_input)
            if user_input == correct_answer:
                score += 1

        flash(f'Your score: {score}/{len(questions)}', 'success' if score / len(questions) >= 0.7 else 'warning')
        return render_template(template, score=score, user_answers=user_answers, title=title)

    return render_template(template, title=title)

# Test Routes
@app.route('/test', methods=['GET', 'POST'])
def test():
    questions = [
        "Hello (informal/singular)",
        "Hello (formal/plural)",
        "How are you (informal/singular)",
        "How are you? (formal/plural)",
        "We are well",
        "I am well too"
    ]
    answers = ["sawubona", "sanibona", "unjani", "ninjani", "siyaphila", "ngiyaphila nami"]
    return validate_test(questions, answers, 'test.html', "Test 1")

@app.route('/test_2', methods=['GET', 'POST'])
def test_2():
    questions = ["Alcohol", "Talk", "Sleep", "Thank you!", "They"]
    answers = ["utshwala", "khuluma", "lala", "ngiyabonga", "ba"]
    return validate_test(questions, answers, 'test-2.html', "Test 2")

@app.route('/test_3', methods=['GET', 'POST'])
def test_3():
    questions = ["Water", "Please", "Sugar", "Read", "you(plural)"]
    answers = ["amanzi", "ngiyacela", "ushukela", "funda", "ni"]
    return validate_test(questions, answers, 'test-3.html', "Test 3")

@app.route('/test_4', methods=['GET', 'POST'])
def test_4():
    questions = [
        "What is your name?",
        "My name is AJ.",
        "Where are you from?",
        "I am from Britstown.",
        "It's good",
        "It's not good"
    ]
    answers = [
        "ubani igama lakho",
        "igama lami ngu aj",
        "uvelaphi",
        "ngivela ebritstown",
        "kulungile",
        "akulungile"
    ]
    return validate_test(questions, answers, 'test-4.html', "Test 4")

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=80)
