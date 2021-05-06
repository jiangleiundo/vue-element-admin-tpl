//规则表达式
const RULES = {
    "formulaResult": "公式结果",//$忽略多语言$
    "if": "如果()\n{\n\n}",//$忽略多语言$
    "ifelse": "如果()\n{\n\n}\n否则\n{\n\n}",//$忽略多语言$

    "and": " 且 ",//$忽略多语言$
    "or": " 或 ",//$忽略多语言$
    "equal": " 等于",//$忽略多语言$
    "notEqual": " 不等于",//$忽略多语言$
    "like": " 包含",//$忽略多语言$
    "notLike": " 不包含",//$忽略多语言$

    "great": " >",
    "low": " <",
    "greatOrEqual": " >=",
    "lowOrEqual": " <=",

    "add": " +",
    "sub": " -",
    "multi": " *",
    "div": " /",

    "assign": " =",
    "brackets": "()",
    "brace": "{\n\n}"
}

const KEYWORDS = {
    "公式结果": "SET @Result", //$忽略多语言$
    "如果": "IF", //$忽略多语言$
    "否则": "ELSE", //$忽略多语言$
    "且": "AND", //$忽略多语言$
    "或": "OR", //$忽略多语言$
    "不等于": "<>", //$忽略多语言$      
    "等于": "=", //$忽略多语言$
    "不包含": "not Like", //$忽略多语言$
    "包含": "Like", //$忽略多语言$
    "{": "BEGIN",
    "}": "END"
}

export default {
    RULES,
    KEYWORDS
}
