<template>
	<view class="com-float-button" :style="{ bottom: parseInt(bottom) + 'rpx' }" @touchmove.stop.prevent="stop">
		<view :class="{ mark: show }" @click="show = false"></view>
		<view :class="show ? 'list-active' : 'list'">
			<view
				class="list-item"
				:class="{ show: show }"
				:style="{ width: parseInt(size) + 'rpx', height: parseInt(size) + 'rpx', background: item.background ? item.background : background }"
				v-for="(item, index) in list"
				:key="index"
				@click="onClick(item)"
			>
				<image class="icon" :src="item.url" mode="aspectFit"></image>
				<text class="name" :style="{ fontSize: parseInt(fontSize) + 'rpx' }">{{ item.name }}</text>
			</view>
		</view>
		<view
			class="list-item show no-mb"
			:style="{ width: parseInt(size) + 'rpx', height: parseInt(size) + 'rpx', background: item.background ? item.background : background }"
			@click="show = !show"
		>
			<image class="icon" :src="show ? closeIcon : openIcon" mode="aspectFit"></image>
			<text class="name" :style="{ fontSize: parseInt(fontSize) + 'rpx' }">{{ show ? closeText : openText }}</text>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: () => []
		},
		// 离屏幕底部距离
		bottom: {
			type: [String, Number],
			default: '350rpx'
		},
		// 图标大小，即按钮宽高rpx
		size: {
			type: [String, Number],
			default: '85rpx'
		},
		fontSize: {
			type: [String, Number],
			default: '20rpx'
		},
		background: {
			type: String,
			default: 'rgba(0, 0, 0, 0.7)'
		},
		openText: {
			type: String,
			default: '更多'
		},
		closeText: {
			type: String,
			default: '返回'
		},
		openIcon: {
			type: String,
			default: 'https://vmhandsel.oss-cn-shenzhen.aliyuncs.com/1597905976399.png'
		},
		closeIcon: {
			type: String,
			default: 'https://vmhandsel.oss-cn-shenzhen.aliyuncs.com/1597905931995.png'
		}
	},
	data() {
		return {
			show: false
		};
	},
	methods: {
		onClick(item) {
			this.$emit('click', item);
			this.show = false;
		},
		stop() {
			return false;
		}
	}
};
</script>

<style lang="scss" scoped>
.com-float-button {
	position: fixed;
	right: 20rpx;
	z-index: 999;
	.mark {
		z-index: -1;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.38);
		transition: all 0.3s linear;
	}
	.list-active {
		position: absolute;
		bottom: 80rpx;
		left: 0;
		transform: scale(1);
		transition: all 0.3s ease-in-out;
	}
	.list {
		position: absolute;
		bottom: 0;
		left: 0;
		transform: scale(0);
		transform-origin: bottom;
		opacity: 0;
		transition: all 0.3s ease-in-out;
	}
	.list-item {
		margin-bottom: 20rpx;
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #fff;
		.iconfont {
			line-height: 1;
			font-size: 45rpx;
		}
		&.no-mb {
			margin-bottom: 0;
		}
		.icon {
			height: 26rpx;
		}
		.name {
			line-height: 1;
			margin-top: 8rpx;
		}
	}
}
</style>
