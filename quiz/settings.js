class Settings {
    constructor() {
        this.settingsDom = document.querySelector('.settings');
        this.quizDom = document.querySelector('.quiz');
        this.categoryDom = document.querySelector('#category');
        this.nQuestions = document.querySelector('#nQuestions');
        this.startBtn = document.querySelector('#startBtn')
        this.difficulty = [
            document.querySelector('#easy'),
            document.querySelector('#medium'),
            document.querySelector('#hard'),
        ];

        this.startBtn.addEventListener('click' , this.startQuiz)
    }


    startQuiz = async ( ) => {
        try {
            const amount = this.getAmount();
            const categoryId = this.categoryDom.value;
            const difficulty = this.getDifficulty();
            const url = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}`;
            let result = await this.fetchData(url);
            console.log(result)
            this.toggleElements()
        }
        catch (err) {
            console.log(err)
        }
    }

    fetchData(url) {
        let theDataResult;
        fetch(url)
            .then(response => response.json()
                .then(data => {
                    theDataResult = data.result;
                })
            );
        console.log(theDataResult)
        return theDataResult;
    }

    getAmount = () => {
        const amount = this.nQuestions.value;
        if (amount > 0 && amount <= 20 ) {
            return amount
        }else {
            alert('please type a number between 1 and 20')
        }
    }

    getDifficulty = () => {
        const difficulty = this.difficulty.filter(el => el.checked);
        if(difficulty.length === 1) {
            return difficulty[0].id;
        }
        else {
            alert('select the difficult')
        }
    }

    toggleElements() {
        this.quizDom.style.display = 'block';
        this.settingsDom.style.display = 'none';
    }
}

export default Settings