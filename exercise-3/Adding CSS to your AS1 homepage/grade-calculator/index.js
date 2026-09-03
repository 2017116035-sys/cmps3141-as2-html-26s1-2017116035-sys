/* CMPS3141-HCI - AS1-26S1 */
import { createApp } from "https://mavue.mavo.io/mavue.js";

createApp(
  {
    data: {
      tests: {
        exam1: 86,
        exam2: 79,
      },
      assessments: {
        project: 95,
        FExam: 92,
      },
      homeworks: [
        { name: "Homework 1", score: 100 },
        { name: "Homework 2", score: 94 },
      ],
    },

    computed: {

      homeworkAverage() {
        let validScores = this.homeworks
          .map((hw) => Number(hw.score))
          .filter((score) => !isNaN(score) && score >= 0);

        if (validScores.length === 0) return 0;

        let sum = validScores.reduce((acc, score) => acc + score, 0);
        return sum / validScores.length;
      },


      calculatedGrade() {
        const e1 = Number(this.tests.exam1) || 0;
        const e2 = Number(this.tests.exam2) || 0;
        const proj = Number(this.assessments.project) || 0;
        const final = Number(this.assessments.FExam) || 0;
        const hwAvg = this.homeworkAverage;

        return (e1 * 0.15) + (e2 * 0.15) + (proj * 0.20) + (final * 0.30) + (hwAvg * 0.20);
      },


      letterGrade() {
        const score = this.calculatedGrade;
        if (score >= 95) return 'A+';
        if (score >= 90) return 'A';
        if (score >= 85) return 'B+';
        if (score >= 80) return 'B';
        if (score >= 75) return 'C+';
        if (score >= 70) return 'C';
        if (score >= 65) return 'D+';
        if (score >= 60) return 'D';
        return 'F';
      }
    },

    methods: {
      addHomework() {
        this.homeworks.push({
          name: `Homework ${this.homeworks.length + 1}`,
          score: 100,
        });
      },


      removeHomework(index) {
        this.homeworks.splice(index, 1);
      },
    },
  },
  "#grade_calc"
);