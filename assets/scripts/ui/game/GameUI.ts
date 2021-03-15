// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import CAction from "../../common/CAction";
import CAudio from "../../common/CAudio";
import GlobalGame from "../../global/GlobalGame";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameUI extends cc.Component {
    private static tweenTime: cc.Tween = null;

    /** 过关回调 */
    static onLevelComplete() {
        GameUI.tweenTime.stop();
        CAudio.playSuccess()
        CAction.onOpenLayer('LevelComplete')
    }

    /**跳转首页 */
    onSceneHome() {
        CAudio.playBack();
        CAction.onScene('home');
    }

    onEnable(){
        GlobalGame.setCurrentTime(0)
    }

    start() {
        GameUI.tweenTime = cc.tween(this.node)
            .call(() => {
                GlobalGame.incrCurrentTime();
            })
            .delay(1)
            .union()
            .repeatForever()
            .start()
    }

    // update (dt) {}
}
