<script setup lang="tsx">
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import { ElCalendar, ElMessage } from 'element-plus'

interface ScheduleItem {
  id: number
  time: string
  title: string
  content: string
  type: 'primary' | 'success' | 'warning' | 'danger'
  category: '旅游' | '工作' | '吃饭' | '演出' | '逛街' | '其他事务'
  preparation?: string
}

interface DaySchedule {
  date: string
  schedules: ScheduleItem[]
}

// 1. 首先声明所有的响应式变量
const currentDate = ref<Date>(new Date())
const scheduleList = ref<DaySchedule[]>([
  {
    date: dayjs(new Date()).format('YYYY-MM-DD'),
    schedules: [
      {
        id: 1,
        time: '09:00',
        title: '晨会',
        content: '讨论本周工作进度',
        type: 'primary',
        category: '工作'
      },
      {
        id: 2,
        time: '11:00',
        title: '需求评审',
        content: '新功能需求讨论',
        type: 'warning',
        category: '工作'
      },
      {
        id: 3,
        time: '14:30',
        title: '代码评审',
        content: '评审新提交的代码',
        type: 'success',
        category: '工作'
      },
      {
        id: 4,
        time: '16:00',
        title: '产品会议',
        content: '讨论产品方向',
        type: 'danger',
        category: '工作'
      }
    ]
  }
])

// 2. 然后声明计算属性
const dateTitle = computed(() => {
  return dayjs(currentDate.value).format('YYYY年MM月DD日')
})

const currentSchedules = computed(() => {
  const date = dayjs(currentDate.value).format('YYYY-MM-DD')
  return scheduleList.value.find(item => item.date === date)?.schedules || []
})

// 3. 最后声明方法
const handleDateClick = (date: Date) => {
  currentDate.value = date
  const selectedDate = dayjs(date).format('YYYY-MM-DD')
  
  // 查找当前日期的日程
  const currentSchedule = scheduleList.value.find(item => item.date === selectedDate)
  
  // 如果没有找到日程，添加一个空的日程列表
  if (!currentSchedule) {
    scheduleList.value.push({
      date: selectedDate,
      schedules: []
    })
  }
}

const calendarCellRenderer = ({ data, date }) => {
  try {
    const cellDate = data.day
    const formattedDate = dayjs(cellDate).format('MM-DD')
    const daySchedule = scheduleList.value.find(item => item.date === cellDate)
    
    return (
      <div 
        class={[
          'calendar-cell',
        ]}
        onClick={() => handleDateClick(date)}
      >
        <span class="calendar-day">{formattedDate}</span>
        { daySchedule?.schedules?.slice(0, 3)?.map(schedule => (
          <div
            key={ schedule.id }
            class={`schedule-marker schedule-marker--${schedule.type}`}
          >
            { schedule.title }
          </div>
        ))}
      </div>
    )
  } catch (error) {
    console.error('Calendar cell render error:', error)
    return <div class="calendar-cell"><span class="calendar-day">{formattedDate}</span></div>
  }
}

const handleAddSchedule = () => {
  // ... 添加日程的逻辑
}

const categoryOptions = [
  { label: '旅游', value: '旅游', type: 'primary' },
  { label: '工作', value: '工作', type: 'warning' },
  { label: '吃饭', value: '吃饭', type: 'success' },
  { label: '演出', value: '演出', type: 'danger' },
  { label: '逛街', value: '逛街', type: 'primary' },
  { label: '其他事务', value: '其他事务', type: 'info' }
]

</script>

<template>
  <div class="page-schedule">
    <div class="schedule-wrap">
      <ContentWrap class="calendar-wrap">
        <ElCalendar 
          v-model="currentDate"
        >
          <template #date-cell="scope">
            <component :is="calendarCellRenderer(scope)" />
          </template>
        </ElCalendar>
      </ContentWrap>
      
      <ContentWrap class="timeline-wrap">
        <template #title>{{ dateTitle }}日程</template>
        <el-timeline>
          <template v-if="currentSchedules.length">
            <el-timeline-item
              v-for="item in currentSchedules"
              :key="item.id"
              :type="item.type"
              :timestamp="item.time"
              placement="top"
            >
              <div class="timeline-content">
                <div class="content-header">
                  <span class="title">{{ item.title }}</span>
                  <el-tag size="small" :type="item.type">{{ item.category }}</el-tag>
                </div>
                
                <template v-if="item.content || item.preparation">
                  <div v-if="item.content" class="content-body">
                    <p class="text">{{ item.content }}</p>
                  </div>
                  
                  <div v-if="item.preparation" class="content-body">
                    <p class="text">{{ item.preparation }}</p>
                  </div>
                </template>
              </div>
            </el-timeline-item>
          </template>
          
          <template v-else>
            <div class="empty-schedule">
              <el-empty description="暂无日程" />
            </div>
          </template>
        </el-timeline>
        
        <div class="add-schedule">
          <el-button type="primary" @click="handleAddSchedule">
            添加日程
          </el-button>
        </div>
      </ContentWrap>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-schedule {
  height: 100%;

  .schedule-wrap {
    display: flex;
    gap: 24px;
    height: 100%;
    padding: 24px;

    .calendar-wrap {
      width: 700px;

      :deep(.el-calendar) {
        background: none;
        border: none;

        .el-calendar-day {
          height: 100px;
          font-size: 12px;
          
          .calendar-cell {
            height: 100%;
            display: flex;
            flex-direction: column;
            gap: 2px;
            border-radius: 4px;
            cursor: pointer;
            padding: 4px;
            transition: background-color 0.2s;
      
            &.is-today {
              .calendar-day {
                color: var(--el-color-primary);
                font-weight: bold;
              }
            }
            
            &.is-selected {
              .calendar-day {
                color: var(--el-color-primary);
                font-weight: bold;
              }
            }
            
            .schedule-marker {
              font-size: 12px;
              padding: 2px 6px;
              border-radius: 4px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              color: #fff;
              
              &--primary {
                background-color: var(--el-color-primary);
              }
              
              &--success {
                background-color: var(--el-color-success);
              }
              
              &--warning {
                background-color: var(--el-color-warning);
              }
              
              &--danger {
                background-color: var(--el-color-danger);
              }
            }
          }
        }
      }
    }

    .timeline-wrap {
      flex: 1;
      overflow: hidden;
      position: relative;

      :deep(.el-timeline) {
        padding: 24px;

        .el-timeline-item__node {
          width: 12px;
          height: 12px;
        }

        .el-timeline-item__timestamp.is-top {
          margin-bottom: 8px;
          padding-top: 0;
          font-size: 14px;
          color: var(--el-text-color-regular);
        }
      }

      .timeline-content {
        .content-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;

          .title {
            font-size: 16px;
            font-weight: 500;
            color: var(--el-text-color-primary);
          }
        }

        .content-body {
          margin-bottom: 8px;

          .label {
            font-size: 13px;
            color: var(--el-text-color-secondary);
            margin-bottom: 4px;
          }

          .text {
            font-size: 14px;
            color: var(--el-text-color-regular);
            margin: 0;
            line-height: 1.6;
          }
        }

        .content-actions {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid var(--el-border-color-lighter);
          text-align: right;
        }
      }

      .add-schedule {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;

        .el-button {
          padding: 12px 24px;
          font-size: 16px;

          .el-icon {
            margin-right: 4px;
          }
        }
      }
    }
  }
}

.schedule-card {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 16px;
      font-weight: 500;
    }
  }

  p {
    color: var(--el-text-color-regular);
    font-size: 14px;
    margin: 0;
  }
}

:deep(.el-dialog) {
  .el-select-dropdown__item {
    .el-tag {
      width: 100%;
      text-align: center;
    }
  }
}

:deep(.el-card__body) {
  padding: 0 !important;
}
</style> 