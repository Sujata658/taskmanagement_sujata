import { getRules, updateRules, createRules } from './repository';

const RuleServices = {
  async getRules(authorId: string) {
    return getRules(authorId);
  },
  async updateRules(authorId: string, rules: { [key: string]: string[] }) { 
    return updateRules(authorId, rules);
  },
  async createRules(authorId: string, rules: { [key: string]: string[] }) {
    return createRules(authorId, rules);
  },
};

export default RuleServices;
