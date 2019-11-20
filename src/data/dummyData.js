// dummy data for development

export default [
    {
        _id: 1,
        title: "React is the best",
        username: "gigi",
        modified_date: new Date(2019, 9, 20, 0, 0, 0),
        category: "code",
        content:
            "I'm learning react and I love it!. It makes javascript so much nicer to write. I love the component architecture.",
        comments: []
    },
    {
        _id: 2,
        title: "Why I Meditate",
        username: "gigi",
        modified_date: new Date(2019, 8, 30, 0, 0, 0),
        category: "",
        content:
            "I've meditated daily for the past 30 years, and I think it has the single biggest impact on the quality of my life",
        comments: [
            {
                _id: 1,
                username: "flowrider",
                content: "This post really speaks to me!"
            }
        ]
    },
    {
        _id: 3,
        title: "Github is my friend",
        username: "jsqueen",
        modified_date: new Date(2019, 9, 15, 0, 0, 0),
        category: "code",
        content:
            "When I first started learning Github, it was not a happy relationship.",
        comments: []
    },
    {
        _id: 4	,
        title: "Bulma makes syling easy",
        username: "gigi",
        modified_date: new Date(2019, 8, 15, 0, 0, 0),
        category: "",
        content:
            "I'm not a front end kind of girl. I want to like styling - I feel like I'm a creative persona and it should be fun, but CSS and I just don't get along.",
        comments: [
            {
                _id: 1,
                username: "jsqueen",
                content: "You are speaking my language gigi."
            }
        ]
    }
]