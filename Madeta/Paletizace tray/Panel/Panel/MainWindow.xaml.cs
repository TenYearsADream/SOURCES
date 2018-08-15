using S7.Net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Interop;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Panel
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        object _syncRoot = new object();
        const string PLC_IP = "10.52.90.166";

        const short SLOT = 2;
        const short RACK = 0;

        public MainWindow()
        {
            InitializeComponent();

            this.SourceInitialized += MainWindow_SourceInitialized;


            this.Width = System.Windows.SystemParameters.WorkArea.Width;
            this.Height = System.Windows.SystemParameters.WorkArea.Height/2;
            this.Left = 0;
            this.Top = System.Windows.SystemParameters.WorkArea.Height / 2;

            System.Windows.Threading.DispatcherTimer dispatcherTimer = new System.Windows.Threading.DispatcherTimer();
            dispatcherTimer.Tick += new EventHandler(dispatcherTimer_Tick);
            dispatcherTimer.Interval = new TimeSpan(0, 0, 1);
            dispatcherTimer.Start();
          
        }

        private void dispatcherTimer_Tick(object sender, EventArgs e)
        {
            lock (_syncRoot)
            {
                try
                {
                    using (Plc plc = new Plc(CpuType.S7300, PLC_IP, RACK, SLOT))
                    {
                        plc.Open();

                        var result = plc.Read("DB14.DBD352");
                        Label_linka_1.Content = result;

                        result = plc.Read("DB16.DBD352");
                        Label_linka_2.Content = result;



                        Info_linka_1.Visibility = Convert.ToBoolean(plc.Read("DB11.DBX676.4")) ? Visibility.Visible : Visibility.Hidden;
                        Info_linka_2.Visibility = Convert.ToBoolean(plc.Read("DB19.DBX680.1")) ? Visibility.Visible : Visibility.Hidden;



                        Button_linka_1.Background = Convert.ToBoolean(plc.Read("DB11.DBX12.3")) ? new SolidColorBrush(Color.FromArgb(255, 255, 0, 0)) : new SolidColorBrush(Color.FromArgb(255, 221, 221, 221));
                        Button_linka_2.Background = Convert.ToBoolean(plc.Read("DB19.DBX12.3")) ? new SolidColorBrush(Color.FromArgb(255, 255, 0, 0)) : new SolidColorBrush(Color.FromArgb(255, 221, 221, 221));
                    }
                    var a = this.Parent;
                }
                catch(Exception)
                {

                }
            }
        }

        private void MainWindow_SourceInitialized(object sender, EventArgs e)
        {
            WindowInteropHelper helper = new WindowInteropHelper(this);
            HwndSource source = HwndSource.FromHwnd(helper.Handle);
            source.AddHook(WndProc);
        }


        

        const int WM_SYSCOMMAND = 0x0112;
        const int SC_MOVE = 0xF010;

        private IntPtr WndProc(IntPtr hwnd, int msg, IntPtr wParam, IntPtr lParam, ref bool handled)
        {

            switch (msg)
            {
                case WM_SYSCOMMAND:
                    int command = wParam.ToInt32() & 0xfff0;
                    if (command == SC_MOVE)
                    {
                        handled = true;
                    }
                    break;
                default:
                    break;
            }
            return IntPtr.Zero;
        }

        private void Button_linka_1_Click(object sender, RoutedEventArgs e)
        {
            lock (_syncRoot)
            {
                try
                {
                    using (Plc plc = new Plc(CpuType.S7300, PLC_IP, RACK, SLOT))
                    {
                        plc.Open();
                        plc.Write("DB11.DBX12.3", true);
                        Button_linka_1.Background = new SolidColorBrush(Color.FromArgb(255, 255, 0, 0));

                    }
                }
                catch (Exception)
                {

                }

            }

        }
        private void Button_linka_2_Click(object sender, RoutedEventArgs e)
        {
            lock (_syncRoot)
            {
                    try
                    {
                        using (Plc plc = new Plc(CpuType.S7300, PLC_IP, RACK, SLOT))
                        {
                            plc.Open();
                            plc.Write("DB19.DBX12.3", true);
                            Button_linka_2.Background = new SolidColorBrush(Color.FromArgb(255, 255, 0, 0));

                        }
                    }
                catch (Exception)
                {

                }
            }
        }

        
    }
}
