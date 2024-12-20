'use client'

import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { Button } from "@/components/ui/button"
import { useAuth } from '../contexts/AuthContext'
import AppLayout from '../../components/AppLayout'
import { Statistic, User } from '@/types'
import { getadlog, getpublog } from '../api/mockApi'

const EChartsDemo: React.FC = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [adData, setAdData] = useState<Statistic[]>([]);
  const [pubData, setPubData] = useState<Statistic[]>([]);
  const [adTimeRange, setAdTimeRange] = useState<'day' | 'month' | 'year'>('day');
  const [pubTimeRange, setPubTimeRange] = useState<'day' | 'month' | 'year'>('day');
  const [operationTimeRange, setOperationTimeRange] = useState<'day' | 'month' | 'year'>('day');
  const [pubOperationTimeRange, setPubOperationTimeRange] = useState<'day' | 'month' | 'year'>('day');

  const today = new Date('2024-12-29'); // 默认今天是2024年12月29日

  useEffect(() => {
    if (authUser) {
      setUser(authUser);
      // 获取广告数据
      getadlog(authUser.id).then(response => setAdData(response));
      // 获取发布数据
      getpublog(authUser.id).then(response => setPubData(response));
    }
  }, [authUser]);

  const filterDataByTimeRange = (data: Statistic[], range: 'day' | 'month' | 'year') => {
    return data.filter(item => {
      const itemDate = new Date(item.createyear, item.createmonth - 1, item.createday);
      const diffTime = today.getTime() - itemDate.getTime();
      const diffDays = diffTime / (1000 * 3600 * 24);

      if (range === 'day' && diffDays <= 1) return true;
      if (range === 'month' && diffDays <= 30) return true;
      if (range === 'year' && diffDays <= 365) return true;

      return false;
    });
  };

  const generateBarOption = (filteredData: Statistic[], title: string) => {
    const categories = Array.from(new Set(filteredData.map(item => item.category)));
    const operations = [1, 2, 3];
    const operationNames = ['点击', '显示', '盈利'];

    const series = operations.map((operation, index) => ({
      name: operationNames[index],
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
        position: 'inside',
        formatter: (params: any) => (params.value !== 0 ? params.value : ''),
      },
      data: categories.map(category =>
        filteredData.filter(item => item.category === category && item.operation === operation).length
      ),
      itemStyle: {
        color: operation === 1 ? '#FF5733' : operation === 2 ? '#33FF57' : '#3357FF',
      },
    }));

    return {
      title: {
        text: title,
        left: 'center', // 水平居中
        top: 'bottom', // 垂直靠下
      },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: { data: operationNames },
      xAxis: { data: categories },
      yAxis: {},
      series,
    };
  };

  const generateOperationBarOption = (filteredData: Statistic[], title: string) => {
    const operations = [1, 2, 3];
    const operationNames = ['显示', '点击', '盈利'];
    const categories = Array.from(new Set(filteredData.map(item => item.category)));

    const series = categories.map(category => ({
      name: category,
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
        position: 'inside',
        formatter: (params: any) => (params.value !== 0 ? params.value : ''),
      },
      data: operations.map(operation =>
        filteredData.filter(item => item.category === category && item.operation === operation).length
      ),
    }));

    return {
      title: {
        text: title,
        left: 'center', // 水平居中
        top: 'bottom', // 垂直靠下
      },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: { data: categories },
      xAxis: { data: operationNames },
      yAxis: {},
      series,
    };
  };

  const generatePieOption = (data: Statistic[], title: string) => {
    const categories = Array.from(new Set(data.map(item => item.category)));
    const operations = [1, 2, 3];
    const operationNames = ['点击', '显示', '盈利'];

    const seriesData = categories.flatMap(category => {
      return operations.map(operation => {
        const count = data.filter(item => item.category === category && item.operation === operation).length;
        return {
          name: `${category} - ${operationNames[operation - 1]}`,
          value: count,
        };
      });
    });

    return {
      title: {
        text: title,
        left: 'center', // 水平居中
        top: 'bottom', // 垂直靠下
      },
      tooltip: { trigger: 'item' },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: title,
          type: 'pie',
          radius: '50%',
          center: ['70%', '60%'], 
          data: seriesData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  };

  const filteredAdData = filterDataByTimeRange(adData, adTimeRange);
  const filteredOperationData = filterDataByTimeRange(adData, operationTimeRange);
  const filteredPubData = filterDataByTimeRange(pubData, pubTimeRange);
  const filteredPubOperationData = filterDataByTimeRange(pubData, pubOperationTimeRange);

  return (
    <AppLayout>
      <div className="flex flex-col items-center space-y-8 p-8 max-w-screen-xl">
        <div className="text-xl font-bold">欢迎用户 {user?.username}</div>
        <div className="grid grid-cols-3 gap-8 w-full">
          {/* 广告统计 */}
          <div className="flex flex-col items-center p-4 w-full">
            <div className="flex space-x-4">
              <Button onClick={() => setAdTimeRange('day')}>过去一天</Button>
              <Button onClick={() => setAdTimeRange('month')}>过去一月</Button>
              <Button onClick={() => setAdTimeRange('year')}>过去一年</Button>
            </div>
            <ReactECharts option={generateBarOption(filteredAdData, '广告统计')} style={{ height: '400px', width: '100%' }} />
          </div>

          {/* 广告操作统计 */}
          <div className="flex flex-col items-center p-4">
            <div className="flex space-x-4">
              <Button onClick={() => setOperationTimeRange('day')}>过去一天</Button>
              <Button onClick={() => setOperationTimeRange('month')}>过去一月</Button>
              <Button onClick={() => setOperationTimeRange('year')}>过去一年</Button>
            </div>
            <ReactECharts option={generateOperationBarOption(filteredOperationData, '操作类型统计')} style={{ height: '400px', width: '100%' }} />
          </div>

          {/* 广告饼图 */}
          <div className="flex flex-col items-center p-4">
            <ReactECharts option={generatePieOption(adData, '广告占比统计')} style={{ height: '400px', width: '100%' }} />
          </div>

          {/* 发布统计 */}
          <div className="flex flex-col items-center p-4">
            <div className="flex space-x-4">
              <Button onClick={() => setPubTimeRange('day')}>过去一天</Button>
              <Button onClick={() => setPubTimeRange('month')}>过去一月</Button>
              <Button onClick={() => setPubTimeRange('year')}>过去一年</Button>
            </div>
            <ReactECharts option={generateBarOption(filteredPubData, '发布统计')} style={{ height: '400px', width: '100%' }} />
          </div>

          {/* 发布操作统计 */}
          <div className="flex flex-col items-center p-4">
            <div className="flex space-x-4">
              <Button onClick={() => setPubOperationTimeRange('day')}>过去一天</Button>
              <Button onClick={() => setPubOperationTimeRange('month')}>过去一月</Button>
              <Button onClick={() => setPubOperationTimeRange('year')}>过去一年</Button>
            </div>
            <ReactECharts option={generateOperationBarOption(filteredPubOperationData, '发布操作统计')} style={{ height: '400px', width: '100%' }} />
          </div>

          {/* 发布饼图 */}
          <div className="flex flex-col items-center p-4">
            <ReactECharts option={generatePieOption(pubData, '发布占比统计')} style={{ height: '400px', width: '100%' }} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default EChartsDemo;
