import { useMemo, useState } from 'react'
import {
  BadgePercent,
  Bookmark,
  Bot,
  CheckCircle2,
  Heart,
  HelpCircle,
  MoreHorizontal,
  Package,
  Send,
  Share2,
  Sparkles,
  Wand2,
  X,
} from 'lucide-react'

const initialComments = [
  '混油皮夏天用会闷吗？',
  '刚刚说的券在哪里领呀',
  '主播能不能上脸试一下',
  '这个和面霜一起买更划算吗',
  '敏感肌可以每天用吗',
]

const aiHighlight = {
  id: 'highlight',
  title: '直播高光总结',
  sections: [
    { label: '正在讲解', text: '水光修护精华，主打补水、屏障修护和妆前服帖。' },
    { label: '当前优惠', text: '直播间价 ¥129，前 300 单赠旅行装。' },
    { label: '高频问题', text: '敏感肌能否使用、是否适合混油皮、怎么搭配面霜。' },
    { label: 'AI 建议', text: '适合想快速补水、修护屏障的人群。' },
  ],
}

const aiActions = [
  {
    id: 'summary',
    icon: Sparkles,
    label: '总结刚刚内容',
    title: '刚刚讲解重点',
    sections: [
      { label: '商品定位', text: '水光修护精华，主打轻薄保湿和熬夜后肤色稳定。' },
      { label: '使用场景', text: '通勤、约会、妆前都可以用，主播强调不黏腻。' },
      { label: '主播提示', text: '连续使用 7 天后肤感更稳，建议搭配面霜锁水。' },
    ],
  },
  {
    id: 'coupon',
    icon: BadgePercent,
    label: '提炼优惠信息',
    title: '直播间优惠速看',
    sections: [
      { label: '到手价', text: '水光修护精华今晚直播价 ¥129。' },
      { label: '叠加优惠', text: '拍 2 件再减 30 元，优惠券需要先领后下单。' },
      { label: '赠品', text: '前 300 单赠旅行装，适合先试用再复购。' },
    ],
  },
  {
    id: 'question',
    icon: HelpCircle,
    label: '生成提问',
    title: '可以直接发给主播',
    sections: [
      { label: '肤质问题', text: '敏感肌换季泛红时可以每天用吗？' },
      { label: '妆前问题', text: '早上妆前用会不会搓泥，后续上粉底服帖吗？' },
      { label: '搭配问题', text: '和云感保湿面霜一起用，早晚顺序怎么安排？' },
    ],
  },
  {
    id: 'decision',
    icon: Wand2,
    label: '判断是否适合我',
    title: '适合度判断',
    sections: [
      { label: '更适合', text: '想要轻薄保湿、改善熬夜暗沉、偏爱清爽肤感的人。' },
      { label: '需确认', text: '强功效抗老需求较高时，建议继续问主播成分浓度。' },
      { label: '购买建议', text: '如果你是敏感肌，先拍单瓶或小样装会更稳妥。' },
    ],
  },
]

function App() {
  const [comments, setComments] = useState(initialComments)
  const [commentInput, setCommentInput] = useState('')
  const [likes, setLikes] = useState(26800)
  const [isAiOpen, setIsAiOpen] = useState(false)
  const [activeAction, setActiveAction] = useState(aiHighlight)

  const formattedLikes = useMemo(() => `${(likes / 10000).toFixed(1)}万`, [likes])

  const sendComment = () => {
    const nextComment = commentInput.trim()

    if (!nextComment) {
      return
    }

    setComments((currentComments) => [...currentComments.slice(-3), nextComment])
    setCommentInput('')
  }

  const openAiSheet = () => {
    setActiveAction(aiHighlight)
    setIsAiOpen(true)
  }

  const selectAiAction = (action) => {
    setActiveAction(action)
    setIsAiOpen(true)
  }

  return (
    <main className="flex h-screen items-center justify-center overflow-hidden bg-[#ececea] px-4 py-5 text-white">
      <section className="relative aspect-[390/844] h-[min(844px,calc(100vh-40px))] max-h-[844px] max-w-[390px] overflow-hidden rounded-[44px] bg-[#121012] shadow-[0_24px_70px_rgba(0,0,0,0.28)] ring-8 ring-[#171717]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_13%,rgba(255,223,214,0.96)_0,rgba(245,122,135,0.72)_24%,rgba(132,40,55,0.78)_50%,#09070a_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,244,236,0.32)_0,rgba(255,36,66,0.14)_28%,rgba(0,0,0,0)_54%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.03)_31%,rgba(0,0,0,0.85)_100%)]" />
        <div className="absolute left-1/2 top-2 h-7 w-28 -translate-x-1/2 rounded-full bg-black/82" />

        <header className="absolute left-0 right-0 top-9 z-20 flex items-center gap-2 px-4">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-white/10 bg-black/24 py-1 pl-1 pr-2 shadow-lg backdrop-blur-xl">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ff9aac] to-[#ff2442] text-xs font-bold">
              红
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-semibold">小红书美妆直播</div>
              <div className="text-[11px] text-white/72">12.8万人观看</div>
            </div>
            <button className="rounded-full bg-[#ff2442] px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-[#ff2442]/25">
              关注
            </button>
          </div>

          <button
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/24 backdrop-blur-xl"
            aria-label="更多"
            title="更多"
          >
            <MoreHorizontal size={20} />
          </button>
          <button
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/24 backdrop-blur-xl"
            aria-label="关闭"
            title="关闭"
          >
            <X size={19} />
          </button>
        </header>

        <section className="absolute inset-x-5 top-[124px] z-10">
          <div className="relative mx-auto h-[356px] overflow-hidden rounded-[42px] border border-white/12 bg-white/8 px-6 pb-6 pt-8 text-center shadow-2xl shadow-black/30 backdrop-blur-[2px]">
            <div className="absolute left-1/2 top-12 h-56 w-56 -translate-x-1/2 rounded-full bg-[#ffe4dc]/20 blur-3xl" />
            <div className="absolute bottom-16 left-1/2 h-16 w-60 -translate-x-1/2 rounded-[50%] bg-black/28 blur-md" />
            <div className="relative mx-auto mb-4 h-24 w-24 rounded-full bg-[radial-gradient(circle_at_35%_25%,#fff4ef_0,#ff9caf_38%,#b02a42_100%)] shadow-[0_22px_60px_rgba(255,36,66,0.44)]" />
            <div className="relative mx-auto mb-4 h-[92px] w-48 rounded-[30px] bg-[linear-gradient(145deg,rgba(255,255,255,0.68),rgba(255,255,255,0.2))] p-2 shadow-[0_20px_48px_rgba(0,0,0,0.24)]">
              <div className="flex h-full flex-col items-center justify-center rounded-[24px] border border-white/36 bg-[#fff4f6]/90 text-[#ff2442]">
                <Package size={30} />
                <span className="mt-1 text-[11px] font-bold">修护精华</span>
              </div>
            </div>
            <div className="relative inline-flex rounded-full bg-black/22 px-3 py-1 text-xs text-white/76 backdrop-blur-md">
              正在讲解
            </div>
            <h1 className="relative mt-2 text-[25px] font-extrabold tracking-normal">
              「水光修护精华」
            </h1>
            <p className="relative mx-auto mt-2 max-w-[260px] text-sm leading-6 text-white/78">
              清爽保湿、妆前友好，主播正在拆解优惠和敏感肌使用方式。
            </p>
          </div>
        </section>

        <aside className="absolute bottom-[252px] right-4 z-30 flex flex-col items-center gap-2.5">
          <ActionButton
            label={formattedLikes}
            title="点赞"
            onClick={() => setLikes((value) => value + 1)}
            icon={<Heart size={22} fill="currentColor" />}
          />
          <ActionButton label="收藏" title="收藏" icon={<Bookmark size={22} />} />
          <ActionButton label="分享" title="分享" icon={<Share2 size={22} />} />
          <button
            className="flex h-[64px] w-[64px] flex-col items-center justify-center rounded-full bg-[#ff2442] text-[11px] font-bold leading-tight text-white shadow-[0_10px_30px_rgba(255,36,66,0.54)] transition active:scale-95"
            onClick={openAiSheet}
            aria-label="AI 助手"
            title="AI 助手"
          >
            <Bot size={20} />
            <span className="mt-0.5">AI 助手</span>
          </button>
        </aside>

        <section className="absolute bottom-[214px] left-4 right-[112px] z-20 space-y-2">
          {comments.slice(-4).map((comment, index) => (
            <div
              className="w-fit max-w-full rounded-full bg-black/44 px-3 py-2 text-[12px] leading-5 text-white shadow-lg backdrop-blur-md"
              key={`${comment}-${index}`}
            >
              {comment}
            </div>
          ))}
        </section>

        <section className="absolute bottom-[82px] left-4 right-4 z-20 rounded-[24px] border border-white/24 bg-white/82 p-3 text-[#191919] shadow-[0_14px_38px_rgba(0,0,0,0.24)] backdrop-blur-2xl">
          <div className="flex gap-3">
            <div className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-[20px] bg-gradient-to-br from-[#ffe2e8] to-[#ff6f84] text-white shadow-inner">
              <Package size={30} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h2 className="truncate text-[15px] font-bold">水光修护精华</h2>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-[#fff1f3] px-2 py-1 text-[10px] font-semibold text-[#ff2442]">
                      直播间价 ¥129
                    </span>
                    <span className="rounded-full bg-[#f2f2ee] px-2 py-1 text-[10px] font-semibold text-[#5d5d58]">
                      敏感肌可用
                    </span>
                  </div>
                </div>
                <div className="text-right text-lg font-extrabold text-[#ff2442]">
                  ¥129
                  <div className="text-[10px] font-semibold text-[#8a8a82] line-through">¥189</div>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="text-xs font-medium text-[#777]">前 300 单赠旅行装</div>
                <button className="rounded-full bg-[#ff2442] px-4 py-2 text-xs font-bold text-white shadow-lg shadow-[#ff2442]/25">
                  去看看
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black via-black/74 to-transparent px-4 pb-5 pt-8">
          <div className="flex items-center gap-2">
            <input
              className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/14 px-4 py-3 text-sm text-white outline-none shadow-inner backdrop-blur-md placeholder:text-white/58 focus:border-white/35"
              value={commentInput}
              onChange={(event) => setCommentInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  sendComment()
                }
              }}
              placeholder="说点什么…"
            />
            <button
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ff2442] text-white shadow-lg shadow-[#ff2442]/32 transition active:scale-95"
              onClick={sendComment}
              aria-label="发送评论"
              title="发送评论"
            >
              <Send size={18} />
            </button>
          </div>
        </footer>

        {isAiOpen && (
          <div className="absolute inset-0 z-40 bg-black/28" onClick={() => setIsAiOpen(false)} />
        )}

        <section
          className={`absolute inset-x-0 bottom-0 z-50 h-[57%] overflow-y-auto rounded-t-[30px] border border-white/16 bg-[#fbfbf8]/96 px-4 pb-4 pt-3 text-[#191919] shadow-[0_-24px_54px_rgba(0,0,0,0.32)] backdrop-blur-2xl transition-transform duration-300 ${
            isAiOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
          aria-hidden={!isAiOpen}
        >
          <div className="mx-auto mb-2.5 h-1.5 w-11 rounded-full bg-black/14" />
          <div className="mb-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff2442] text-white">
                <Bot size={19} />
              </div>
              <div>
                <h2 className="text-lg font-bold">AI 直播助手</h2>
                <p className="text-xs text-[#777]">帮你快速理解直播内容与优惠信息</p>
              </div>
            </div>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0f0ec] text-[#555]"
              onClick={() => setIsAiOpen(false)}
              aria-label="关闭 AI 助手"
              title="关闭"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {aiActions.map((action) => {
              const Icon = action.icon
              const isActive = activeAction.id === action.id

              return (
                <button
                  className={`flex min-h-[48px] items-center gap-2 rounded-[17px] border px-3 text-left text-[13px] font-semibold transition ${
                    isActive
                      ? 'border-[#ff2442] bg-[#fff1f3] text-[#ff2442]'
                      : 'border-[#e8e8e2] bg-white text-[#30302d]'
                  }`}
                  key={action.id}
                  onClick={() => selectAiAction(action)}
                >
                  <Icon size={17} />
                  {action.label}
                </button>
              )
            })}
          </div>

          <div className="mt-2.5 rounded-[22px] border border-[#e8e8e2] bg-white p-3 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-sm font-bold">
              <CheckCircle2 size={18} className="text-[#ff2442]" />
              {activeAction.title}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {activeAction.sections.map((section) => (
                <article
                  className="min-h-[66px] rounded-2xl bg-[linear-gradient(135deg,#fff7f8,#f7f7f3)] px-2.5 py-2"
                  key={section.label}
                >
                  <div className="mb-0.5 text-[11px] font-bold text-[#ff2442]">
                    {section.label}
                  </div>
                  <p className="text-[11px] leading-[16px] text-[#474742]">{section.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}

function ActionButton({ icon, label, title, onClick }) {
  return (
    <button
      className="flex w-14 flex-col items-center gap-1 text-xs font-semibold text-white drop-shadow-lg transition active:scale-95"
      onClick={onClick}
      aria-label={title}
      title={title}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/36 backdrop-blur-md">
        {icon}
      </span>
      <span>{label}</span>
    </button>
  )
}

export default App
