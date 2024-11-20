export const QUESTIONS = [
    {
        question_id: 1,
        label: "Comment conjuguer le verbe être au présent ?",
        skills: [
            { label: "Compétence 1", skill_id: 1, parent_id: 0, level: { level_id: 1, label: "Level 1" } },
            { label: "Compétence 2", skill_id: 2, parent_id: 1, level: { level_id: 1, label: "Level 1" } }
        ],
        test: { test_id: 1, label: "Test 1" },
        level: { level_id: 1, label: "Level 1" }
    },
    {
        question_id: 2,
        label: "Quelle est la règle pour accorder les adjectifs en genre et en nombre ?",
        skills: [
            { label: "Compétence 3", skill_id: 3, parent_id: 0, level: { level_id: 2, label: "Level 2" } },
            { label: "Compétence 4", skill_id: 4, parent_id: 3, level: { level_id: 2, label: "Level 2" } }
        ],
        test: { test_id: 2, label: "Test 2" },
        level: { level_id: 2, label: "Level 2" }
    },
    {
        question_id: 3,
        label: "Comment former le passé composé avec avoir ?",
        skills: [
            { label: "Compétence 5", skill_id: 5, parent_id: 0, level: { level_id: 1, label: "Level 1" } },
            { label: "Compétence 6", skill_id: 6, parent_id: 5, level: { level_id: 1, label: "Level 1" } }
        ],
        test: { test_id: 3, label: "Test 3" },
        level: { level_id: 1, label: "Level 1" }
    },
    {
        question_id: 4,
        label: "Quelles sont les règles de base pour l'accord du participe passé ?",
        skills: [
            { label: "Compétence 7", skill_id: 7, parent_id: 0, level: { level_id: 3, label: "Level 3" } },
            { label: "Compétence 8", skill_id: 8, parent_id: 7, level: { level_id: 3, label: "Level 3" } }
        ],
        test: { test_id: 4, label: "Test 4" },
        level: { level_id: 3, label: "Level 3" }
    },
    {
        question_id: 5,
        label: "Comment utiliser les pronoms personnels en français ?",
        skills: [
            { label: "Compétence 9", skill_id: 9, parent_id: 0, level: { level_id: 1, label: "Level 1" } },
            { label: "Compétence 10", skill_id: 10, parent_id: 9, level: { level_id: 1, label: "Level 1" } }
        ],
        test: { test_id: 5, label: "Test 5" },
        level: { level_id: 1, label: "Level 1" }
    },
    {
        question_id: 6,
        label: "Quelle est la différence entre le passé simple et l'imparfait ?",
        skills: [
            { label: "Compétence 11", skill_id: 11, parent_id: 0, level: { level_id: 2, label: "Level 2" } },
            { label: "Compétence 12", skill_id: 12, parent_id: 11, level: { level_id: 2, label: "Level 2" } }
        ],
        test: { test_id: 6, label: "Test 6" },
        level: { level_id: 2, label: "Level 2" }
    }
];
