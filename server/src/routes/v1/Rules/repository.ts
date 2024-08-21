import { RuleModel, RulesDocument } from './model';


interface Rules {
  rules: {
      [key: string]: string[];
  };
}

export const getRules = (authorId: string):Promise<RulesDocument | null> => {
  return RuleModel.findOne({ author: authorId }).exec();
};

export const updateRules=(authorId: string, rules: Rules['rules']) => {
  return RuleModel.updateOne({ author: authorId }, rules);
}

export const createRules = (authorId: string, rules: { [key: string]: string[] }) => {
  console.log('repo',rules.rules)
  const rule = new RuleModel({ author: authorId, rules: rules.rules});
  return rule.save();
};
