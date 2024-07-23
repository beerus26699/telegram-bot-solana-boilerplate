import { Action, Ctx, Update } from "nestjs-telegraf";
import { Scenes } from "telegraf";
import { BotActions } from "./bot.enum";

@Update()
export class BotAction {
    @Action(BotActions.ImportWallet)
    async actionImportWallet(@Ctx() ctx: Scenes.SceneContext) {
        await ctx.reply("You click ImportWallet")
    }

    @Action(BotActions.GenerateWallet)
    async actionGenerateWallet(@Ctx() ctx: Scenes.SceneContext) {
        await ctx.reply("You click GenerateWallet")
    }

    @Action(BotActions.BuySell)
    async actionBuySell(@Ctx() ctx: Scenes.SceneContext) {
        await ctx.reply("You clickBuySell")
    }

    @Action(BotActions.LimitOrder)
    async actionLimitOrder(@Ctx() ctx: Scenes.SceneContext) {
        await ctx.reply("You click LimitOrder")
    }

    @Action(BotActions.CopyTrading)
    async actionCopyTrading(@Ctx() ctx: Scenes.SceneContext) {
        await ctx.reply("You click CopyTrading")
    }

    @Action(BotActions.Asset)
    async actionAsset(@Ctx() ctx: Scenes.SceneContext) {
        await ctx.reply("You click Asset")
    }

    @Action(BotActions.Wallet)
    async actionWallet(@Ctx() ctx: Scenes.SceneContext) {
        await ctx.reply("You click Wallet")
    }

    @Action(BotActions.Settings)
    async actionSettings(@Ctx() ctx: Scenes.SceneContext) {
        await ctx.reply("You click Settings")
    }

    @Action(BotActions.Language)
    async actionLanguage(@Ctx() ctx: Scenes.SceneContext) {
        await ctx.reply("You click Language")
    }

    @Action(BotActions.Help)
    async actionHelp(@Ctx() ctx: Scenes.SceneContext) {
        await ctx.reply("You click Help")
    }

    @Action(BotActions.InviteFriends)
    async actionInviteFriends(@Ctx() ctx: Scenes.SceneContext) {
        await ctx.reply("You click InviteFriends")
    }

    @Action(BotActions.SolBot)
    async actionSolBot(@Ctx() ctx: Scenes.SceneContext) {
        await ctx.reply("You click SolBot")
    }
}