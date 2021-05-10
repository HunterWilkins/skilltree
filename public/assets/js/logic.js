// Save skills via an array of objects/classes

class Skill {
    constructor(_name, _type, _level, _current, _goal) {
        this.name = _name;
        this.type = _type;
        this.level = _level;
        this.current = _current;
        this.goal = _goal;
    }
  
    levelUp(newGoal) {
        const goal = this.goal;

        this.level++;
        this.current = goal;
        this.goal = newGoal;
    }
};

async function grabSkills() {
    const skills = await fetch("/api/skills").then(response => response.json());
    skills.forEach(item => {
        appendSkill(item);
    });
};

async function postSkill() {
    
}

grabSkills();

const skillSpecs = {};
const goalSpecs = {};

const specInput =` <form id="specs" style = "display:none;">
                    <input type="text" name = "spec-name" placeholder = "Spec Name (ex: weight)">
                    <input type="text" name = "spec-value" placeholder = "Spec Value (ex: 20)">
                    <button id = "submit-spec">Submit</button>
                   </form>`;


function toggleSpecInput(event) {
    event.preventDefault();
   
    $("#specs").remove();
    $($(this).attr("data-type") === "skill" ? "#skill-specs" : "#goal-specs").append(specInput);

    $("#specs").css("display", "block");
    $("#specs").attr("data-spec-type", $(this).attr("data-type"));
}

function addSpec(event) {
    event.preventDefault();
    const specType = $("#specs").attr("data-spec-type");
    const specName = $("input[name=spec-name]").val();
    const specValue = $("input[name=spec-value]").val();
    const skill = specType === "skill";

    (skill ? skillSpecs : goalSpecs)[specName] = specValue;
    $("#" + (skill ? "skill-specs" : "goal-specs")).empty();
    for (var x in (skill ? skillSpecs : goalSpecs)) {
        $("#" + (skill ? "skill-specs" : "goal-specs")).append(
            `
            <p>${x} : ${(skill ? skillSpecs : goalSpecs)[x]}</p>
            `
        );
    }
};

function createSkill() {
    const NewSkill = new Skill($("input[name=name]").val(), $("input[name=type]").val(), Math.round($("input[name=level]").val()), skillSpecs, goalSpecs);
    console.log(NewSkill);
    appendSkill(NewSkill);
};

function appendSkill(Skill) {
    const parentDiv = $("<div class = 'skill'>");
    const levelElement = $("<p class = 'level'>").text(Skill.level);
    const nameElement = $("<h2 class = 'name'>").text(Skill.name);
    const currentLabel = $("<p>").text("Current Skill Specs");
    const currentDiv = $("<ul class = 'current'>");
    const goalLabel = $("<p>").text("Goal");

    for (var x in Skill.current) {
        let skillElement = $("<li>").text(`${x} : ${Skill.current[x]}`);
        currentDiv.append(skillElement); 
    };

    const goalDiv = $("<ul class = 'goal'>");

    for (var x in Skill.goal) {
        let goalElement = $("<li>").text(`${x} : ${Skill.goal[x]}`);
        goalDiv.append(goalElement);
    }

    parentDiv.append(nameElement, levelElement, currentLabel, currentDiv, goalLabel, goalDiv);

    $("#skills").append(parentDiv);
}

$(".add-spec").on("click", toggleSpecInput);

$(document).on("click", "#submit-spec", addSpec);

$("#submit-skill").on("click", createSkill);

// Seeds =/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/
// const BicepCurl = new Skill("Bicep Curl", "workout", 3, {weight: 20, reps: 3, sets: 2}, {weight: 30, reps: 4, sets: 5000});
// const TricepCurl = new Skill("Tricep Curl", "workout", 3, {weight: 40, reps: 4, sets: 3}, {weight: 500, reps: 900, sets: "infinity"});

// const seedSkills = [BicepCurl, TricepCurl];
// seedSkills.forEach(item => appendSkill(item));


