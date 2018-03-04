package com.robopal.madeta.panel;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
    public void myClick(android.view.View view) {
        TextView text = findViewById(R.id.text1);
        text.setText("Tlačítko 4");
    }

    public void myClick2(android.view.View view) {
        TextView text = findViewById(R.id.text1);
        text.setText("Tlačítko 2");
    }
}
