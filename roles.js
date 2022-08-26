module.exports = function (){
    this.color = [{
        title: "Color",
        description: "Change the appearance of your name on this server (you can only pick one color",
        color: 0xbd93f9,
        ShowRoles: true,
        ShowEmotes: false,
        FieldName: "An overview, what all the colors look like:",
        AllowMultiple: false
    },
        {name: "Black",         RoleID: "634370326419079209"},    //Black
        {name: "White",         RoleID: "634370328528945182"},    //White
        {name: "Grey",          RoleID: "638768037163696128"},    //Grey
        {name: "Ice Blue",      RoleID: "638766542242185236"},    //Ice Blue
        {name: "Pastel Blue",   RoleID: "638766699536973826"},    //Pastel Blue
        {name: "Blue",          RoleID: "634370332198830121"},    //Blue
        {name: "Turquoise",     RoleID: "638768033812447232"},    //Turquoise
        {name: "Pastel Green",  RoleID: "638768035460808705"},    //Pastel Green
        {name: "Green",         RoleID: "632985816234328064"},    //Green
        {name: "Pastel Yellow", RoleID: "638768034445787156"},    //Pastel Yellow
        {name: "Yellow",        RoleID: "634370169405440040"},    //Yellow
        {name: "Pastel Orange", RoleID: "638768036387487745"},    //Pastel Orange
        {name: "Orange",        RoleID: "634370835653591080"},    //Orange
        {name: "Pastel Red",    RoleID: "638768035141779461"},    //Pastel Red
        {name: "Red",           RoleID: "634370635358797844"},    //Red
        {name: "Pastel Purple", RoleID: "638768037905956865"},    //Pastel Purple
        {name: "Purple",        RoleID: "634370832264724497"},    //Purple
        {name: "Pastel Rosé",   RoleID: "638768038405210176"},    //Pastel Rosé
        {name: "Rosé",          RoleID: "633747486774657034"},    //Rosé
        {name: "Pink",          RoleID: "632681990348341268"}     //Pink
    ];

    this.gender = [{
        title: "Gender",
        description: "Pick one two or even more genders you are most comfortable with and show people how to refer to you",
        color: 0xbd93f9,
        ShowRoles: true,
        RoleID: "636150151672496148",
        ShowEmotes: true,
        FieldName: "An overview, what all the roles look like:",
        AllowMultiple: true
    },     //Gender (Category Role)
        {CustomEmote: false, name: "Men",           EmoteName: "🚹",   RoleID: "636151235912663041"},     //Men
        {CustomEmote: false, name: "Woman",         EmoteName: "🚺",   RoleID: "636151235183116298"},     //Woman
        {CustomEmote: false, name: "Transgender",   EmoteName: "⚧",    RoleID: "880759777980973078"},     //Transgender
        {CustomEmote: false, name: "Other Gender",  EmoteName: "✳️",     RoleID: "636151237280137216"}      //Other Gender
    ];

    this.sexuality = [{
        title: "Sexuality",
        description: "If you want to show your sexuality these roles are great for you. If you are not sure what to pick or just curious, [here](https://lgbtqia.fandom.com/wiki/Category:Sexual_orientation) is a wiki site for you.",
        color: 0xbd93f9,
        ShowRoles: false,
        RoleID: "636150163659948043",
        ShowEmotes: true,
        AllowMultiple: true
    }, //Sexuality (Category Role)
        {CustomEmote: true,     name: "Heterosexual",   EmoteName: "hetrosexual",   EmoteID: "634165219488170034",  RoleID: "636151232855015445"},     //Heterosexual
        {CustomEmote: true,     name: "Lesbian",        EmoteName: "lesbian",       EmoteID: "634165218976727050",  RoleID: "636151230267129876"},     //Lesbian
        {CustomEmote: false,    name: "Gay",            EmoteName: "🏳️‍🌈",                                          RoleID: "717869686855041024"},    //Gay
        {CustomEmote: true,     name: "Pansexual",      EmoteName: "pansexual",     EmoteID: "634165218716418059",  RoleID: "636151234541256704"},     //Pansexual
        {CustomEmote: true,     name: "Bisexual",       EmoteName: "bisexual",      EmoteID: "634165217298743297",  RoleID: "692133185609531463"},     //Bisexual
        {CustomEmote: true,     name: "Asexual",        EmoteName: "asexual",       EmoteID: "634165216866992158",  RoleID: "636151233656258561"},     //Asexual
        {CustomEmote: true,     name: "Polysexual",     EmoteName: "Polysexual",    EmoteID: "717874788428939285",  RoleID: "717876017234182247"},     //Polysexual
        {CustomEmote: false,    name: "Other Sexuality",EmoteName: "❓",                                            RoleID: "717871034786775122"}     //Other Sexuality
    ];

    this.romantic_attraction = [{
        title: "Romantic Attraction",
        description: "If you want to show people your Romantic Attraction you can use these roles. If you are not sure what to pick or just curious, [here](https://lgbtqia.fandom.com/wiki/Romantic_orientation) is a wiki site for you.",
        color: 0xbd93f9,
        ShowRoles: false,
        RoleID: "880751537406758962",
        ShowEmotes: false,
        AllowMultiple: true
    },    //Romantic Attraction (Category Role)
        {CustomEmote: false, name: "Heteroromantic",            EmoteName: "", RoleID: "880750358211747870"},    //Heteroromantic
        {CustomEmote: false, name: "Homoromantic",              EmoteName: "", RoleID: "880750385462124604"},    //Homoromantic
        {CustomEmote: false, name: "Panromantic",               EmoteName: "", RoleID: "880750382630965289"},    //Panromantic
        {CustomEmote: false, name: "Biromantic",                EmoteName: "", RoleID: "880750378755436596"},    //Biromantic
        {CustomEmote: false, name: "Aromantic",                 EmoteName: "", RoleID: "880750384086417448"},    //Aromantic
        {CustomEmote: false, name: "Polyamore",                 EmoteName: "", RoleID: "880751265624244245"},    //Polyamore
        {CustomEmote: false, name: "Other Romantic Attraction", EmoteName: "", RoleID: "880750386762371142"}     //Other Romantic Attraction
    ];

    this.age = [{
        title: "Age",
        description: "Pick a fitting age group",
        color: 0xbd93f9,
        ShowRoles: false,
        RoleID: "636150159817834497",
        ShowEmotes: true,
        AllowMultiple: false
    },     //Age (Category Role)
        {CustomEmote: false, name: "Under 16",      EmoteName: "👶", RoleID: "636151228254126080"},     //Under 16
        {CustomEmote: false, name: "Up to 16",      EmoteName: "👦", RoleID: "636151225829556224"},     //Up to 18
        {CustomEmote: false, name: "18 or above",   EmoteName: "👨", RoleID: "636151230967578634"}     //18 or above
    ];

    this.hobbies = [{
        title: "Hobbies",
        description: "What do you like?\nThese selfroles are a great way to show that and to find other people that have common interest",
        color: 0xbd93f9,
        ShowRoles: false,
        RoleID: "636150162791727104",
        ShowEmotes: true,
        AllowMultiple: true
    },     //Hobbies (Category Role)
        {CustomEmote: false, name: "Creative",      EmoteName: "🖌",    RoleID: "636151231395659803"},     //Creative
        {CustomEmote: false, name: "Singing",       EmoteName: "🎤",    RoleID: "636151236588208128"},     //Singing
        {CustomEmote: false, name: "Dancing",       EmoteName: "🕺",    RoleID: "636151232305561601"},     //Dancing
        {CustomEmote: false, name: "Sport",         EmoteName: "🎽",    RoleID: "636173480840265768"},     //Sport
        {CustomEmote: false, name: "Music",         EmoteName: "🎵",    RoleID: "636173483516100628"},     //Music
        {CustomEmote: false, name: "Programming",   EmoteName: "⌨️",     RoleID: "636173482471718912"},     //Programming
        {CustomEmote: false, name: "Gaming",        EmoteName: "🎮",    RoleID: "636173484904546334"},     //Gaming
        {CustomEmote: false, name: "Anime / Manga", EmoteName: "🍡",    RoleID: "636173485714178058"},     //Anime / Manga
        {CustomEmote: false, name: "Traveling",     EmoteName: "✈️",     RoleID: "636173484124405760"}      //Traveling
    ];

    this.dm_status = [{
        title: "DM",
        description: "Are you comfortable with people sending you DMs?",
        color: 0xbd93f9,
        ShowRoles: false,
        RoleID: "636150161537499166",
        ShowEmotes: true,
        AllowMultiple: false
    },     //DM (Category Role)
        {CustomEmote: false, name: "Accepted",  EmoteName: "👌", RoleID: "636150962301698049"},     //DM Accepted
        {CustomEmote: false, name: "Ask",       EmoteName: "🖐️", RoleID: "785622071128358943"},     //Ask before DM
        {CustomEmote: false, name: "No",        EmoteName: "❌", RoleID: "636150995755466763"}      //Don't DM me
    ];

    this.ping = [{
        title: "Ping",
        description: "Does some of the following sound interesting to you?\nIf you want to get notified when something is happening for these topics these roles are great for you",
        color: 0xbd93f9,
        ShowRoles: false,
        RoleID: "645571614108286986",
        ShowEmotes: true,
        AllowMultiple: true
    },     //Pings (Category Role)
        {CustomEmote: false, name: "News",      EmoteName: "📰", RoleID: "636150822169739274"},     //[Ping} News
        {CustomEmote: false, name: "Gaming",    EmoteName: "🖱️", RoleID: "645571817133834240"}      //[Ping} Gaming
    ];
}