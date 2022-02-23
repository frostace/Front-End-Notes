export default class Coursera {
    selectTeacher(number) {
        this.teacher = number === 1 ? "Andrew" : "Michael";
    }

    purchaseMachineLearning() {
        this.course = "I have purchased Machine Learning with: " + this.teacher;
    }

    purchaseNaturalLanguageProcessing() {
        this.course =
            "I have purchased Natural Language Processing with: " +
            this.teacher;
    }

    purchaseDeepLearning() {
        this.course = "I have purchased Deep Learning with: " + this.teacher;
    }

    purchaseKnowledgeGraph() {
        this.course = "I have purchased Knowledge Graph with: " + this.teacher;
    }
}
