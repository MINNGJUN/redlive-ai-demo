import { useMemo, useState } from 'react'
import {
  BadgePercent,
  Bookmark,
  Bot,
  CheckCircle2,
  Heart,
  HelpCircle,
  MoreHorizontal,
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

const defaultLikes = 26800
const likedLikes = 27800

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
      { label: '商品定位', text: '水光修护精华，主打轻薄保湿和熬夜后肤感稳定。' },
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
  const [likes, setLikes] = useState(defaultLikes)
  const [isLiked, setIsLiked] = useState(false)
  const [isCollected, setIsCollected] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [isAiOpen, setIsAiOpen] = useState(false)
  const [activeAction, setActiveAction] = useState(aiHighlight)
  const [selectedActionId, setSelectedActionId] = useState('summary')

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
    setSelectedActionId('summary')
    setIsAiOpen(true)
  }

  const selectAiAction = (action) => {
    setActiveAction(action)
    setSelectedActionId(action.id)
    setIsAiOpen(true)
  }

  const toggleLike = () => {
    setIsLiked((current) => {
      const next = !current
      setLikes(next ? likedLikes : defaultLikes)
      return next
    })
  }

  return (
    <main className="flex h-screen items-center justify-center overflow-hidden bg-[#f5f5f5] px-4 py-5 text-white">
      <section className="relative aspect-[390/844] h-[min(844px,calc(100vh-40px))] max-h-[844px] max-w-[390px] overflow-hidden rounded-[44px] bg-[#111013] shadow-[0_18px_44px_rgba(0,0,0,0.2)] ring-8 ring-[#171717]">
        <img
          className="absolute inset-0 h-full w-full object-cover object-center"
          src="/images/live-host-bg.jpg"
          alt="水光修护精华直播讲解画面"
        />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/50 via-black/18 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/86 via-black/42 to-transparent" />
        <div className="absolute inset-0 bg-black/[0.03]" />
        <div className="absolute left-1/2 top-2 h-7 w-28 -translate-x-1/2 rounded-full bg-black/80" />

        <header className="absolute left-0 right-0 top-12 z-20 flex items-center gap-2 px-4">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-white/10 bg-black/22 py-1 pl-1 pr-2 backdrop-blur-md">
            <img
              className="h-8 w-8 shrink-0 rounded-full object-cover"
              src="/images/avatar.png"
              alt="小红书美妆直播头像"
            />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-medium">小红书美妆直播</div>
              <div className="text-[11px] font-normal text-white/70">12.8万人观看</div>
            </div>
            <button
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                isFollowing ? 'bg-black/30 text-white/82' : 'bg-[#ff2442] text-white'
              }`}
              onClick={() => setIsFollowing((current) => !current)}
              aria-pressed={isFollowing}
            >
              {isFollowing ? '已关注' : '关注'}
            </button>
          </div>

          <button
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/22 backdrop-blur-md"
            aria-label="更多"
            title="更多"
          >
            <MoreHorizontal size={20} />
          </button>
          <button
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/22 backdrop-blur-md"
            aria-label="关闭"
            title="关闭"
          >
            <X size={19} />
          </button>
        </header>

        <section className="absolute bottom-[350px] left-4 right-[116px] z-20 text-left">
          <div className="inline-flex rounded-full bg-black/26 px-3 py-1 text-xs font-normal text-white/84">
            正在讲解
          </div>
          <h1 className="mt-2 text-[22px] font-semibold tracking-normal">「水光修护精华」</h1>
          <p className="mt-2 max-w-[236px] text-[13px] font-normal leading-5 text-white/78">
            清爽保湿、妆前友好，主播正在拆解优惠和敏感肌使用方式。
          </p>
        </section>

        <aside className="absolute bottom-[246px] right-4 z-30 flex flex-col items-center gap-2.5">
          <ActionButton
            label={formattedLikes}
            title="点赞"
            onClick={toggleLike}
            pressed={isLiked}
            icon={
              <Heart
                size={21}
                className={isLiked ? 'text-[#ff2442]' : 'text-white'}
                fill={isLiked ? 'currentColor' : 'none'}
              />
            }
          />
          <ActionButton
            label={isCollected ? '已收藏' : '收藏'}
            title="收藏"
            onClick={() => setIsCollected((current) => !current)}
            pressed={isCollected}
            icon={
              <Bookmark
                size={21}
                className={isCollected ? 'text-[#fdbc5f]' : 'text-white'}
                fill={isCollected ? 'currentColor' : 'none'}
              />
            }
          />
          <ActionButton label="分享" title="分享" icon={<Share2 size={21} />} />
          <ActionButton
            label="AI"
            title="AI 助手"
            onClick={openAiSheet}
            icon={<Bot size={21} className="text-white" />}
          />
        </aside>

        <section className="absolute bottom-[190px] left-4 right-[132px] z-20 space-y-1">
          {comments.slice(-4).map((comment, index) => (
            <div
              className="w-fit max-w-full rounded-full bg-black/34 px-3 py-1.5 text-[12px] font-normal leading-5 text-white/92 backdrop-blur-sm"
              key={`${comment}-${index}`}
            >
              {comment}
            </div>
          ))}
        </section>

        <section className="absolute bottom-[82px] left-4 right-4 z-20 rounded-[20px] border border-white/36 bg-white/[0.92] p-2.5 text-[rgba(0,0,0,0.8)]">
          <div className="flex gap-2.5">
            <div className="flex h-[64px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/60 p-1">
              <img
                className="h-[76px] w-[66px] object-contain mix-blend-multiply"
                src="/images/product-serum.png"
                alt="水光修护精华商品图"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h2 className="truncate text-[15px] font-semibold">水光修护精华</h2>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-[rgba(48,48,52,0.08)] px-2 py-1 text-[10px] font-medium text-[rgba(0,0,0,0.62)]">
                      敏感肌可用
                    </span>
                    <span className="rounded-full bg-[rgba(48,48,52,0.06)] px-2 py-1 text-[10px] font-medium text-[rgba(0,0,0,0.62)]">
                      前 300 单赠旅行装
                    </span>
                  </div>
                </div>
                <div className="text-right text-base font-semibold text-[rgba(0,0,0,0.8)]">
                  ¥129
                  <div className="text-[10px] font-normal text-[rgba(0,0,0,0.45)]">直播间价</div>
                </div>
              </div>
              <div className="mt-1.5 flex items-center justify-between">
                <div className="text-xs font-normal text-[rgba(0,0,0,0.45)]">
                  清爽保湿 / 妆前友好
                </div>
                <button className="rounded-full bg-[#ff2442] px-4 py-2 text-xs font-medium text-white">
                  去看看
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black via-black/70 to-transparent px-4 pb-5 pt-8">
          <div className="flex items-center gap-2">
            <input
              className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/14 px-4 py-3 text-sm font-normal text-white outline-none placeholder:text-white/56 focus:border-white/35"
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
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/16 text-white transition active:scale-95"
              onClick={sendComment}
              aria-label="发送评论"
              title="发送评论"
            >
              <Send size={18} />
            </button>
          </div>
        </footer>

        {isAiOpen && (
          <div className="absolute inset-0 z-40 bg-black/36" onClick={() => setIsAiOpen(false)} />
        )}

        <section
          className={`absolute inset-x-0 bottom-0 z-50 max-h-[54%] overflow-y-auto rounded-t-[20px] bg-[#fbfbf8] px-4 pb-4 pt-2 text-[rgba(0,0,0,0.8)] transition-transform duration-300 ${
            isAiOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
          aria-hidden={!isAiOpen}
        >
          <div className="mx-auto mb-2 h-1 w-9 rounded-full bg-[rgba(0,0,0,0.12)]" />
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(255,36,66,0.08)] text-[#ff2442]">
                <Bot size={19} />
              </div>
              <div>
                <h2 className="text-[17px] font-semibold">AI 直播助手</h2>
                <p className="text-xs font-normal text-[rgba(0,0,0,0.45)]">
                  帮你快速理解直播内容与优惠信息
                </p>
              </div>
            </div>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(48,48,52,0.08)] text-[rgba(0,0,0,0.62)]"
              onClick={() => setIsAiOpen(false)}
              aria-label="关闭 AI 助手"
              title="关闭"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {aiActions.map((action) => {
              const Icon = action.icon
              const isActive = selectedActionId === action.id

              return (
                <button
                  className={`flex min-h-9 items-center gap-1.5 rounded-full border px-3 text-left text-[12px] font-medium transition ${
                    isActive
                      ? 'border-[rgba(255,36,66,0.28)] bg-[rgba(255,36,66,0.08)] text-[rgba(0,0,0,0.8)]'
                      : 'border-transparent bg-[rgba(48,48,52,0.08)] text-[rgba(0,0,0,0.8)]'
                  }`}
                  key={action.id}
                  onClick={() => selectAiAction(action)}
                  aria-pressed={isActive}
                >
                  <Icon size={15} />
                  {action.label}
                </button>
              )
            })}
          </div>

          <div className="mt-3 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-3">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <CheckCircle2 size={17} className="text-[rgba(0,0,0,0.62)]" />
              {activeAction.title}
            </div>
            <ul className="space-y-2">
              {activeAction.sections.map((section) => (
                <li className="flex gap-2" key={section.label}>
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgba(48,48,52,0.35)]" />
                  <div>
                    <div className="text-[12px] font-medium text-[rgba(0,0,0,0.8)]">
                      {section.label}
                    </div>
                    <p className="text-[12px] font-normal leading-[18px] text-[rgba(0,0,0,0.62)]">
                      {section.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </section>
    </main>
  )
}

function ActionButton({ icon, label, title, onClick, pressed = false }) {
  return (
    <button
      className="flex w-14 flex-col items-center gap-1 text-[11px] font-medium text-white/94 transition active:scale-95"
      onClick={onClick}
      aria-label={title}
      aria-pressed={pressed}
      title={title}
    >
      <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-black/28">
        {icon}
      </span>
      <span>{label}</span>
    </button>
  )
}

export default App
