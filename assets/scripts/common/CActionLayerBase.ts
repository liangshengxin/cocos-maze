/**
 * 所有layer层基础组件
 */

import CAction from "./CAction";


const { ccclass, property } = cc._decorator;

@ccclass
export default class CActionLayerBase extends cc.Component {
    /** 刷新当前层 */
    onRefreshLayer(): void { };

    /** 关闭层 */
    onClose() {
        this.node.zIndex = 0;
        this.node.active = false;
        this.node.scale = 0;
        this.node.opacity = 0;
        return this;
    }
    /**
     * 打开层
     * @param zIndex 
     * @param isTween 是否显示动画效果
     */
    onOpen(zIndex: number = 0, isTween: boolean = true) {
        //设置当前层触摸，禁止底层触摸生效
        this.node.on(cc.Node.EventType.TOUCH_START, () => { })
        this.node.zIndex = 1 + zIndex;
        this.node.active = true;

        //设置动态打开效果
        if (isTween) {
            cc.tween(this.node)
                .to(0, { scale: 0, opacity: 0, })
                .to(0.2, { scaleX: 1, scaleY: 1, opacity: 255, }, { easing: "backOut" })
                .start()
        } else {
            this.node.scale = 1;
        }
        return this;
    }

    /** 打开 */
    CActionOnOpenLayerButton(event: cc.Event.EventTouch, customEventData: string) {
        CAction.onOpenLayer(customEventData)
    }
    /** 后退 */
    CActionOnBackLayerButton(event: cc.Event.EventTouch, customEventData: string) {
        CAction.onBackLayer(customEventData)
    }
}